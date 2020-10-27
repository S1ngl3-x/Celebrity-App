import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Quiz from './quiz.entity';
import { Repository } from 'typeorm';
import UpdateQuizDto from './dto/updateQuiz.dto';
import QuizNotFoundException from './exceptions/quizNotFound.exception';
import User from '../user/user.entity';
import { QuestionService } from '../question/question.service';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    private questionService: QuestionService,
  ) {}

  async createRandomWithQuestions(user: User): Promise<Quiz> {
    const newQuiz = await this.create(user);
    const amount = 5;

    const promises = [];
    for (let i = 0; i < amount; i++) {
      promises.push(this.questionService.createRandom({quiz: newQuiz}))
    }

    newQuiz.questions = await Promise.all(promises);

    return newQuiz;
  }

  async create(user: User): Promise<Quiz> {
    const newQuiz = await this.quizRepository.create({
      user: user,
    });
    await this.quizRepository.save(newQuiz);
    return newQuiz;
  }

  async findAll(): Promise<Quiz[]> {
    return await this.quizRepository.find({ relations: ['user'] });
  }

  async findById(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne(id, { relations: ['user'] });
    if (quiz) return quiz;
    throw new QuizNotFoundException(id);
  }

  async update(id: number, quizDto: UpdateQuizDto): Promise<Quiz> {
    await this.quizRepository.update(id, quizDto);
    const updatedQuiz = await this.quizRepository.findOne(id, { relations: ['user'] });
    if (updatedQuiz) return updatedQuiz;
    throw new QuizNotFoundException(id);
  }

  async delete(id: number): Promise<void> {
    const deleteQuiz = await this.quizRepository.delete(id);
    if (!deleteQuiz.affected) throw new QuizNotFoundException(id);
  }
}
