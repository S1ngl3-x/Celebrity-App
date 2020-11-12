import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import Quiz from '../quiz/quiz.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
class User {
  @ApiProperty({ example: 1, description: 'Id of a user' })
  @PrimaryGeneratedColumn()
  public id?: number;

  @ApiProperty({ example: 'johndoe@mail.com', description: 'Email of a user' })
  @Column({ unique: true })
  public email: string;

  // @ApiProperty({
  //   example: 'strongAndComplicatedPassword',
  //   description: 'At least 5 characters long password',
  // })
  @Column()
  @Exclude()
  public password: string;

  @OneToMany(() => Quiz, (quiz: Quiz) => quiz.user)
  public quizzes: Quiz[];
}

export default User;

// @ApiProperty({ example: 1, description: 'The age of the Cat' })
// age: number;
//
// @ApiProperty({
//   example: 'Maine Coon',
//   description: 'The breed of the Cat',
// })
// breed: string;
