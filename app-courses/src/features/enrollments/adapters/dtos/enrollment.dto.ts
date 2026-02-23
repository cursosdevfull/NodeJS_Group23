import { plainToInstance } from "class-transformer";
import { Enrollment } from "../../domain/enrollment";
import { EnrollmentData } from "../persistence/enrollment.entity";

export class EnrollmentDto {
  static fromDomainToData(
    domain: Enrollment | Enrollment[],
  ): EnrollmentData | EnrollmentData[] {
    if (Array.isArray(domain)) {
      return domain.map(
        (enrollment) =>
          EnrollmentDto.fromDomainToData(enrollment) as EnrollmentData,
      );
    }

    return plainToInstance(EnrollmentData, domain.properties);
  }

  static fromDataToDomain(
    data: EnrollmentData | EnrollmentData[],
  ): Enrollment | Enrollment[] {
    if (Array.isArray(data)) {
      return data.map(
        (enrollment) =>
          EnrollmentDto.fromDataToDomain(enrollment) as Enrollment,
      );
    }

    return new Enrollment({
      id: data.id,
      enrollmentDate: data.enrollmentDate,
      studentId: data.studentId,
      scheduleId: data.scheduleId,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
