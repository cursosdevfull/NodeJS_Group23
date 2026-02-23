import { Paginated } from "@core/types";
import { GenericException } from "@shared/exceptions/generic.exception";
import { Repository } from "typeorm";
import { Student } from "../domain/student";
import { StudentPort } from "../ports/student.port";
import { StudentDto } from "./dtos";
import { StudentData } from "./persistence/student.entity";

export class StudentAdapter implements StudentPort {
  constructor(private readonly studentRepository: Repository<StudentData>) {}

  async save(student: Student): Promise<Student> {
    try {
      const data = StudentDto.fromDomainToData(student) as StudentData;
      await this.studentRepository.save(data);

      return student;
    } catch (error) {
      console.log("Error in StudentAdapter.save:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findById(id: number): Promise<Student | null> {
    try {
      const student = await this.studentRepository.findOne({
        where: { id, active: true },
      });

      return student ? (StudentDto.fromDataToDomain(student) as Student) : null;
    } catch (error) {
      console.log("Error in StudentAdapter.findById:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findAll(): Promise<Student[]> {
    try {
      const data = await this.studentRepository.find({
        where: { active: true },
      });

      return StudentDto.fromDataToDomain(data) as Student[];
    } catch (error) {
      console.log("Error in StudentAdapter.findAll:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async getByPage(page: number, limit: number): Promise<Paginated<Student>> {
    try {
      const [data, total] = await this.studentRepository.findAndCount({
        where: { active: true },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        items: StudentDto.fromDataToDomain(data) as Student[],
        total,
        page,
        limit,
      };
    } catch (error) {
      console.log("Error in StudentAdapter.getByPage:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }
}
