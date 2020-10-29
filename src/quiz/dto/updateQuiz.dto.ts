import { IsNumber, IsOptional } from 'class-validator';

class UpdateQuizDto {
  @IsNumber()
  @IsOptional()
  id: number;
}

export default UpdateQuizDto;
