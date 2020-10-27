import { IsNotEmpty, IsNumber } from 'class-validator';
import Question from '../../question/question.entity';
import User from '../../user/user.entity';

class AnswerQuizDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  questions: Question[];
}

export default AnswerQuizDto;
