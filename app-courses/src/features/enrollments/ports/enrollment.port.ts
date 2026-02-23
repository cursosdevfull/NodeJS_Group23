import { Paginated } from "@core/types";
import { Enrollment } from "../domain/enrollment";

export type EnrollmentPort = {
  save(enrollment: Enrollment): Promise<Enrollment>;
  findById(id: number): Promise<Enrollment | null>;
  findAll(): Promise<Enrollment[]>;
  getByPage(page: number, limit: number): Promise<Paginated<Enrollment>>;
};
