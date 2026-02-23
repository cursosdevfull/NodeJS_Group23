import { plainToInstance } from "class-transformer";
import { Teacher } from "../../domain/teacher";
import { TeacherData } from "../persistence/teacher.entity";

export class TeacherDto {
  static fromDomainToData(
    domain: Teacher | Teacher[],
  ): TeacherData | TeacherData[] {
    if (Array.isArray(domain)) {
      return domain.map(
        (teacher) => TeacherDto.fromDomainToData(teacher) as TeacherData,
      );
    }

    return plainToInstance(TeacherData, domain.properties);
  }

  static fromDataToDomain(
    data: TeacherData | TeacherData[],
  ): Teacher | Teacher[] {
    if (Array.isArray(data)) {
      return data.map(
        (teacher) => TeacherDto.fromDataToDomain(teacher) as Teacher,
      );
    }

    return new Teacher({
      id: data.id,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      linkedinUrl: data.linkedinUrl,
      summary: data.summary,
      photoUrl: data.photoUrl,
      skills: data.skills,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
