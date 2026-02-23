import { Paginated } from "@core/types";
import { Course } from "../domain/course";

export type CoursePort = {
  save(course: Course): Promise<Course>;
  findById(id: number): Promise<Course | null>;
  findAll(): Promise<Course[]>;
  getByPage(page: number, limit: number): Promise<Paginated<Course>>;
};
