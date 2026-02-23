import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name!: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  lastname!: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
  ) // Minimum eight characters, at least one uppercase, one digit, and one special character
  password!: string;
}
