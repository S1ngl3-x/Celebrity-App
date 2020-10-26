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

  @Column({ nullable: true })
  public correctlyAnswered?: number;

  @Index('question_quizId_index')
  @ManyToOne(() => Quiz, (quiz: Quiz) => quiz.questions)
  public quiz: Quiz;
}

export default Question;
