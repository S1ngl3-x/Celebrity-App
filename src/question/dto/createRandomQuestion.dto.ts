import { IsNotEmpty } from 'class-validator';
import Quiz from '../../quiz/quiz.entity';

class CreateRandomQuestionDto {
  @IsNotEmpty()
  quiz: Quiz;
}

export default CreateRandomQuestionDto;
