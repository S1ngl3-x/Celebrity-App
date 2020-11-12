import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

class UpdateQuizDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsBoolean()
  @IsOptional()
  completed: boolean;
}

export default UpdateQuizDto;
