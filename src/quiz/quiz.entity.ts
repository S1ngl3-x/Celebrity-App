import { Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from '../user/user.entity';
import Question from '../question/question.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
class Quiz {
  @ApiProperty({ example: 1, description: 'Number id of a user' })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({ example: 1, description: 'Id of a user the quiz belongs to' })
  @Index('quiz_userId_index')
  @ManyToOne(() => User, (user: User) => user.quizzes)
  public user: User;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Array of questions-ids that are part of a quiz',
  })
  @OneToMany(() => Question, (question: Question) => question.quiz, { eager: true })
  public questions: Question[];
}

export default Quiz;
