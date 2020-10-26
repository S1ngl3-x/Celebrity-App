import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class UpdateQuizDto {
  @IsNumber()
  @IsOptional()
  id: number;
}

export default UpdateQuizDto;
