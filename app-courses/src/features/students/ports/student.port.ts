import { Paginated } from "@core/types";
import { Student } from "../domain/student";

export type StudentPort = {
  save(student: Student): Promise<Student>;
  findById(id: number): Promise<Student | null>;
  findAll(): Promise<Student[]>;
  getByPage(page: number, limit: number): Promise<Paginated<Student>>;
};
