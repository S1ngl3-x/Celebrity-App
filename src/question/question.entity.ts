import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import QuestionType from './enums/questionType';
import Quiz from '../quiz/quiz.entity';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

// @ApiExtraModels(Question)
@Entity()
class Question {
  @ApiProperty({ example: 1, description: 'Id of a question' })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({ example: 'To be or not to be', description: 'The question content' })
  @Column()
  public text: string;

  @ApiProperty({
    name: 'questionType',
    enum: QuestionType,
    description: 'Correct answer to the question',
  })
  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  public type: QuestionType;

  @ApiProperty({
    name: 'answer',
    enum: QuestionType,
    description: 'Answer chosen by user',
  })
  @Column({
    type: 'enum',
    enum: QuestionType,
    nullable: true,
  })
  public answer: QuestionType;

  @Index('question_quizId_index')
  @ManyToOne(() => Quiz, (quiz: Quiz) => quiz.questions, { onDelete: 'CASCADE' })
  public quiz: Quiz;
}

export default Question;
