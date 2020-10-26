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

  @IsNumber()
  @IsOptional()
  correctlyAnswered: number;

  @IsNotEmpty()
  quiz: Quiz;
}

export default CreateQuestionDto;
