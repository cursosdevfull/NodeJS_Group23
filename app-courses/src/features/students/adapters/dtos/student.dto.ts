import { plainToInstance } from "class-transformer";
import { Student } from "../../domain/student";
import { StudentData } from "../persistence/student.entity";

export class StudentDto {
  static fromDomainToData(
    domain: Student | Student[],
  ): StudentData | StudentData[] {
    if (Array.isArray(domain)) {
      return domain.map(
        (student) => StudentDto.fromDomainToData(student) as StudentData,
      );
    }

    return plainToInstance(StudentData, domain.properties);
  }

  static fromDataToDomain(
    data: StudentData | StudentData[],
  ): Student | Student[] {
    if (Array.isArray(data)) {
      return data.map(
        (student) => StudentDto.fromDataToDomain(student) as Student,
      );
    }

    return new Student({
      id: data.id,
      name: data.name,
      lastname: data.lastname,
      nickname: data.nickname,
      phone: data.phone,
      email: data.email,
      countryCode: data.countryCode as any,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
