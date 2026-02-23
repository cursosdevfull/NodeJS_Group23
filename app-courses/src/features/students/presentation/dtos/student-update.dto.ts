import { IsEnum, IsOptional, IsString, Length } from "class-validator";
import { CountryCode } from "../../domain/student";

export class StudentUpdateDto {
  @IsString()
  @IsOptional()
  @Length(3, 255)
  name?: string;

  @IsString()
  @IsOptional()
  @Length(3, 255)
  lastname?: string;

  @IsString()
  @IsOptional()
  @Length(3, 20)
  nickname?: string;

  @IsString()
  @IsOptional()
  @Length(7, 15)
  phone?: string;

  @IsEnum(CountryCode)
  @IsOptional()
  countryCode?: keyof typeof CountryCode;
}
