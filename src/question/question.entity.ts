import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import QuestionType from './enums/questionType';
import Quiz from '../quiz/quiz.entity';

@Entity()
class Question {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public text: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  public type: QuestionType;

  @Column({
    type: 'enum',
    enum: QuestionType,
    nullable: true,
  })
  public answer: QuestionType;

  @Index('question_quizId_index')
  @ManyToOne(() => Quiz, (quiz: Quiz) => quiz.questions)
  public quiz: Quiz;
}

export default Question;
