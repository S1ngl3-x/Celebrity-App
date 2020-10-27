import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Question from './question.entity';
import { Repository } from 'typeorm';
import CreateQuestionDto from './dto/createQuestion.dto';
import QuestionNotFoundException from './exceptions/questionNotFound.exception';
import UpdateQuestionDto from './dto/updateQuestion.dto';
import QuestionType from './enums/questionType';
import { TrumpService } from '../trump/trump.service';
import { SwiftService } from '../swift/swift.service';
import CreateRandomQuestionDto from './dto/createRandomQuestion.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private readonly trumpService: TrumpService,
    private readonly swiftService: SwiftService,
  ) {}

  async create(questionDto: CreateQuestionDto): Promise<Question> {
    const newQuestion = await this.questionRepository.create({
      ...questionDto,
      quiz: questionDto.quiz,
    });
    await this.questionRepository.save(newQuestion);

    return newQuestion;
  }

  async createRandom(questionDto: CreateRandomQuestionDto): Promise<Question> {
    const questionType: QuestionType = this.generateRandomQuestionType();

    const question = new Question();
    question.quiz = questionDto.quiz;

    if (questionType === QuestionType.SWIFT) {
      question.type = QuestionType.SWIFT;
      question.text = await this.swiftService.getRandomQuote();
    } else {
      question.type = QuestionType.TRUMP;
      question.text = await this.trumpService.getRandomQuote();
    }

    const newQuestion = await this.questionRepository.create(question);
    await this.questionRepository.save(newQuestion);

    return newQuestion;
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find({
      relations: ['quiz'],
    });
  }

  async findById(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne(id, { relations: ['quiz'] });
    if (question) return question;
    throw new QuestionNotFoundException(id);
  }

  async update(id: number, questionDto: UpdateQuestionDto): Promise<Question> {
    await this.questionRepository.update(id, questionDto);
    const updatedQuestion = await this.questionRepository.findOne(id, {
      relations: ['quiz'],
    });
    if (updatedQuestion) return updatedQuestion;
    throw new QuestionNotFoundException(id);
  }

  async delete(id: number): Promise<void> {
    const deleteQuestion = await this.questionRepository.delete(id);
    if (!deleteQuestion.affected) throw new QuestionNotFoundException(id);
  }

  private generateRandomQuestionType(): QuestionType {
    return Math.random() >= 0.5 ? QuestionType.SWIFT : QuestionType.TRUMP;
  }
}
