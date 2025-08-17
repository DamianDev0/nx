import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVideoGameDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  price!: number;

  @IsInt()
  categoryId!: number;
}
