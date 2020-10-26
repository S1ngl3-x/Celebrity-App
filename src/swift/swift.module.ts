import { HttpModule, Module } from '@nestjs/common';
import { SwiftService } from './swift.service';

@Module({
  imports: [HttpModule],
  providers: [SwiftService],
  exports: [SwiftService],
})
export class SwiftModule {}
