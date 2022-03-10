import { IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  age: number;
}
