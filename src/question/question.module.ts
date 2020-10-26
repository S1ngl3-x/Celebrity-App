import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Question from './question.entity';
import { TrumpModule } from '../trump/trump.module';
import { SwiftModule } from '../swift/swift.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), TrumpModule, SwiftModule],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
