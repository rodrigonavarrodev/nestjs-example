import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  tittle: string;

  @IsNotEmpty()
  description: string;
}
