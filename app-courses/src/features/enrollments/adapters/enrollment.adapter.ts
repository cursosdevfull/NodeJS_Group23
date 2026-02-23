import { Paginated } from "@core/types";
import { GenericException } from "@shared/exceptions/generic.exception";
import { Repository } from "typeorm";
import { Enrollment } from "../domain/enrollment";
import { EnrollmentPort } from "../ports/enrollment.port";
import { EnrollmentDto } from "./dtos";
import { EnrollmentData } from "./persistence/enrollment.entity";

export class EnrollmentAdapter implements EnrollmentPort {
  constructor(
    private readonly enrollmentRepository: Repository<EnrollmentData>,
  ) {}

  async save(enrollment: Enrollment): Promise<Enrollment> {
    try {
      const data = EnrollmentDto.fromDomainToData(enrollment) as EnrollmentData;
      await this.enrollmentRepository.save(data);
      return enrollment;
    } catch (error) {
      console.log("Error in EnrollmentAdapter.save:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findById(id: number): Promise<Enrollment | null> {
    try {
      const enrollment = await this.enrollmentRepository.findOne({
        where: { id, active: true },
      });
      return enrollment
        ? (EnrollmentDto.fromDataToDomain(enrollment) as Enrollment)
        : null;
    } catch (error) {
      console.log("Error in EnrollmentAdapter.findById:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findAll(): Promise<Enrollment[]> {
    try {
      const data = await this.enrollmentRepository.find({
        where: { active: true },
      });
      return EnrollmentDto.fromDataToDomain(data) as Enrollment[];
    } catch (error) {
      console.log("Error in EnrollmentAdapter.findAll:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async getByPage(page: number, limit: number): Promise<Paginated<Enrollment>> {
    try {
      const [data, total] = await this.enrollmentRepository.findAndCount({
        where: { active: true },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        items: EnrollmentDto.fromDataToDomain(data) as Enrollment[],
        total,
        page,
        limit,
      };
    } catch (error) {
      console.log("Error in EnrollmentAdapter.getByPage:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }
}
