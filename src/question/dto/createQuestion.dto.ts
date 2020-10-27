import QuestionType from '../enums/questionType';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import Quiz from '../../quiz/quiz.entity';

class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  context: string;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  type: QuestionType;

  @IsEnum(QuestionType)
  @IsOptional()
  answer: QuestionType;

  @IsNotEmpty()
  quiz: Quiz;
}

export default CreateQuestionDto;
