import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import Quiz from './quiz.entity';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz]), QuestionModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
