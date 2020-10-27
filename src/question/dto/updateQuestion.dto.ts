import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import QuestionType from '../enums/questionType';
import Quiz from '../../quiz/quiz.entity';

class UpdateQuestionDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  context?: string;

  @IsEnum(QuestionType)
  @IsOptional()
  type?: QuestionType;

  @IsEnum(QuestionType)
  @IsOptional()
  answer?: QuestionType;

  @IsOptional()
  quiz?: Quiz;
}

export default UpdateQuestionDto;
