import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { CountryCode } from "../../domain/student";

export class StudentCreateDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  lastname!: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  nickname!: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 15)
  phone!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsEnum(CountryCode)
  @IsNotEmpty()
  countryCode!: keyof typeof CountryCode;
}
