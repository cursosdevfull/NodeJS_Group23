import { IsNotEmpty, IsString, Length } from "class-validator";

export class RoleCreateDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name!: string;
}
