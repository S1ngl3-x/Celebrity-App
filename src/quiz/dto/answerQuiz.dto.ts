import { IsNotEmpty, IsNumber } from 'class-validator';
import Question from '../../question/question.entity';
import { ApiProperty } from '@nestjs/swagger';

class AnswerQuizDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ type: [Question] })
  @IsNotEmpty()
  questions: Question[];
}

export default AnswerQuizDto;
