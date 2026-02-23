import { Paginated } from "@core/types";
import { GenericException } from "@shared/exceptions/generic.exception";
import { Repository } from "typeorm";
import { Schedule } from "../domain/schedule";
import { SchedulePort } from "../ports/schedule.port";
import { ScheduleDto } from "./dtos";
import { ScheduleData } from "./persistence/schedule.entity";

export class ScheduleAdapter implements SchedulePort {
  constructor(private readonly scheduleRepository: Repository<ScheduleData>) {}

  async save(schedule: Schedule): Promise<Schedule> {
    try {
      const data = ScheduleDto.fromDomainToData(schedule) as ScheduleData;
      await this.scheduleRepository.save(data);
      return schedule;
    } catch (error) {
      console.log("Error in ScheduleAdapter.save:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findById(id: number): Promise<Schedule | null> {
    try {
      const schedule = await this.scheduleRepository.findOne({
        where: { id, active: true },
      });
      return schedule
        ? (ScheduleDto.fromDataToDomain(schedule) as Schedule)
        : null;
    } catch (error) {
      console.log("Error in ScheduleAdapter.findById:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findAll(): Promise<Schedule[]> {
    try {
      const data = await this.scheduleRepository.find({
        where: { active: true },
      });
      return ScheduleDto.fromDataToDomain(data) as Schedule[];
    } catch (error) {
      console.log("Error in ScheduleAdapter.findAll:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async getByPage(page: number, limit: number): Promise<Paginated<Schedule>> {
    try {
      const [data, total] = await this.scheduleRepository.findAndCount({
        where: { active: true },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        items: ScheduleDto.fromDataToDomain(data) as Schedule[],
        total,
        page,
        limit,
      };
    } catch (error) {
      console.log("Error in ScheduleAdapter.getByPage:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }
}
