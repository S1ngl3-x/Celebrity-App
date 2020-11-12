import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class FindOneParams {
  @ApiProperty({ type: Number })
  @IsNumberString()
  id: string;
}

export default FindOneParams;
