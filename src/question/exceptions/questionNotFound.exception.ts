import { NotFoundException } from '@nestjs/common';

class QuestionNotFoundException extends NotFoundException {
  constructor(questionId: number) {
    super(`Question with id ${questionId} was not found`);
  }
}

export default QuestionNotFoundException;
