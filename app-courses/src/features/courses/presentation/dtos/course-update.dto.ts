import { IsOptional, IsString } from "class-validator";

export class CourseUpdateDto {
  @IsOptional()
  @IsString({ message: "El título debe ser una cadena de texto" })
  title!: string;
}
