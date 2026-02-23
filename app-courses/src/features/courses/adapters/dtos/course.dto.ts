import { plainToInstance } from "class-transformer";
import { Course } from "../../domain/course";
import { CourseData } from "../persistence/course.entity";

export class CourseDto {
  static fromDomainToData(
    domain: Course | Course[],
  ): CourseData | CourseData[] {
    if (Array.isArray(domain)) {
      return domain.map(
        (course) => CourseDto.fromDomainToData(course) as CourseData,
      );
    }

    return plainToInstance(CourseData, domain.properties);
  }

  static fromDataToDomain(data: CourseData | CourseData[]): Course | Course[] {
    if (Array.isArray(data)) {
      return data.map((course) => CourseDto.fromDataToDomain(course) as Course);
    }
    return new Course(data);
  }
}
