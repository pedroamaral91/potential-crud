import { IsDateString, IsNumber, IsString, Length } from 'class-validator';

export class DeveloperDTO {
  @IsString()
  readonly name: string;

  @IsString()
  @Length(1, 1)
  readonly sex: string;

  @IsNumber()
  readonly age: number;

  @IsString()
  readonly hobby: string;

  @IsDateString()
  readonly date_of_birth: string;
}
