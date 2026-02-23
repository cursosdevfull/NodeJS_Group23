import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class IdDto {
  @IsNotEmpty({ message: "El id no debe estar vacío" })
  @IsNumber({}, { message: "El id debe ser un número" })
  @Min(1, { message: "El id debe ser un número positivo mayor que 0" })
  @Type(() => Number)
  id!: number;
}
