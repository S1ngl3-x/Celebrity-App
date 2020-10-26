import { HttpModule, Module } from '@nestjs/common';
import { TrumpService } from './trump.service';

@Module({
  imports: [HttpModule],
  providers: [TrumpService],
  exports: [TrumpService],
})
export class TrumpModule {}
