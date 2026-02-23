import { IsNotEmpty, IsString, Length } from "class-validator";

export class RoleUpdateDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name!: string;
}
