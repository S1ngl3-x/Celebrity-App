import { Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from '../user/user.entity';
import Question from '../question/question.entity';

@Entity()
class Quiz {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index('quiz_userId_index')
  @ManyToOne(() => User, (user: User) => user.quizzes)
  public user: User;

  @OneToMany(() => Question, (question: Question) => question.quiz, { eager: true })
  public questions: Question[];
}

export default Quiz;
