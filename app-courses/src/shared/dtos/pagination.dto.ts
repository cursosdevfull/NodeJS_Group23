import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class PaginationDto {
  @IsNotEmpty({ message: "La página no debe estar vacía" })
  @IsNumber({}, { message: "La página debe ser un número" })
  @Min(1, { message: "La página debe ser un número positivo mayor que 0" })
  @Type(() => Number)
  page!: number;

  @IsNotEmpty({ message: "El límite no debe estar vacío" })
  @IsNumber({}, { message: "El límite debe ser un número" })
  @Min(1, { message: "El límite debe ser un número positivo mayor que 0" })
  @Type(() => Number)
  limit!: number;
}
