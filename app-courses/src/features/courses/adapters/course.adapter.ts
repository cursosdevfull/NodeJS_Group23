import { Paginated } from "@core/types/paginated";
import { GenericException } from "@shared/exceptions";
import { Repository } from "typeorm";
import { Course } from "../domain/course";
import { CoursePort } from "../ports/course.port";
import { CourseDto } from "./dtos";
import { CourseData } from "./persistence/course.entity";

export class CourseAdapter implements CoursePort {
  constructor(private readonly courseRepository: Repository<CourseData>) {}

  async save(course: Course): Promise<Course> {
    try {
      const data = CourseDto.fromDomainToData(course) as CourseData;
      await this.courseRepository.save(data);

      return course;
    } catch (error) {
      console.log("Error in CourseAdapter.save:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findById(id: number): Promise<Course | null> {
    try {
      const course = await this.courseRepository.findOne({
        where: { id, active: true },
      });

      return course ? (CourseDto.fromDataToDomain(course) as Course) : null;
    } catch (error) {
      console.log("Error in CourseAdapter.findById:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findAll(): Promise<Course[]> {
    try {
      const data = await this.courseRepository.find({
        where: { active: true },
      });
      console.log("Data retrieved from database:", data);

      return CourseDto.fromDataToDomain(data) as Course[];
    } catch (error) {
      console.log("Error in CourseAdapter.findAll:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async getByPage(page: number, limit: number): Promise<Paginated<Course>> {
    try {
      const [data, total] = await this.courseRepository.findAndCount({
        where: { active: true },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        items: CourseDto.fromDataToDomain(data) as Course[],
        total,
        page,
        limit,
      };
    } catch (error) {
      console.log("Error in CourseAdapter.getByPage:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }
}
