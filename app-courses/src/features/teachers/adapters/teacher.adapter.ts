import { Paginated } from "@core/types";
import { GenericException } from "@shared/exceptions/generic.exception";
import { Repository } from "typeorm";
import { Teacher } from "../domain/teacher";
import { TeacherPort } from "../ports/teacher.port";
import { TeacherDto } from "./dtos";
import { TeacherData } from "./persistence/teacher.entity";

export class TeacherAdapter implements TeacherPort {
  constructor(private readonly teacherRepository: Repository<TeacherData>) {}

  async save(teacher: Teacher): Promise<Teacher> {
    try {
      const data = TeacherDto.fromDomainToData(teacher) as TeacherData;
      await this.teacherRepository.save(data);
      return teacher;
    } catch (error) {
      console.log("Error in TeacherAdapter.save:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findById(id: number): Promise<Teacher | null> {
    try {
      const teacher = await this.teacherRepository.findOne({
        where: { id, active: true },
      });
      return teacher ? (TeacherDto.fromDataToDomain(teacher) as Teacher) : null;
    } catch (error) {
      console.log("Error in TeacherAdapter.findById:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findAll(): Promise<Teacher[]> {
    try {
      const data = await this.teacherRepository.find({
        where: { active: true },
      });
      return TeacherDto.fromDataToDomain(data) as Teacher[];
    } catch (error) {
      console.log("Error in TeacherAdapter.findAll:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async getByPage(page: number, limit: number): Promise<Paginated<Teacher>> {
    try {
      const [data, total] = await this.teacherRepository.findAndCount({
        where: { active: true },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        items: TeacherDto.fromDataToDomain(data) as Teacher[],
        total,
        page,
        limit,
      };
    } catch (error) {
      console.log("Error in TeacherAdapter.getByPage:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }
}
