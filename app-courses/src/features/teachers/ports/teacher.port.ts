import { Paginated } from "@core/types";
import { Teacher } from "../domain/teacher";

export type TeacherPort = {
  save(teacher: Teacher): Promise<Teacher>;
  findById(id: number): Promise<Teacher | null>;
  findAll(): Promise<Teacher[]>;
  getByPage(page: number, limit: number): Promise<Paginated<Teacher>>;
};
