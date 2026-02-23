import { plainToInstance } from "class-transformer";
import { Schedule } from "../../domain/schedule";
import { ScheduleData } from "../persistence/schedule.entity";

export class ScheduleDto {
  static fromDomainToData(
    domain: Schedule | Schedule[],
  ): ScheduleData | ScheduleData[] {
    if (Array.isArray(domain)) {
      return domain.map(
        (schedule) => ScheduleDto.fromDomainToData(schedule) as ScheduleData,
      );
    }

    return plainToInstance(ScheduleData, domain.properties);
  }

  static fromDataToDomain(
    data: ScheduleData | ScheduleData[],
  ): Schedule | Schedule[] {
    if (Array.isArray(data)) {
      return data.map(
        (schedule) => ScheduleDto.fromDataToDomain(schedule) as Schedule,
      );
    }

    return new Schedule({
      id: data.id,
      title: data.title,
      urlImage: data.urlImage,
      duration: data.duration,
      goals: data.goals,
      syllabus: data.syllabus,
      requirements: data.requirements,
      frequency: data.frequency,
      rangeHours: data.rangeHours,
      start: data.start,
      slogan: data.slogan,
      teacherId: data.teacherId,
      courseId: data.courseId,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
