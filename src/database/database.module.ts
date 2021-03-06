import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Quiz from '../quiz/quiz.entity';
import User from '../user/user.entity';
import Question from '../question/question.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // host: configService.get('POSTGRES_HOST'),
        // port: configService.get('POSTGRES_PORT'),
        // username: configService.get('POSTGRES_USER'),
        // password: configService.get('POSTGRES_PASSWORD'),
        // database: configService.get('POSTGRES_DB'),
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        // entities: [__dirname + '/../**/*.entity.ts'], // not working
        // entities: [Quiz, User, Question],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
