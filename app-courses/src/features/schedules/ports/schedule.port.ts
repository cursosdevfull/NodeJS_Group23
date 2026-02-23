import { Paginated } from "@core/types";
import { Schedule } from "../domain/schedule";

export type SchedulePort = {
  save(schedule: Schedule): Promise<Schedule>;
  findById(id: number): Promise<Schedule | null>;
  findAll(): Promise<Schedule[]>;
  getByPage(page: number, limit: number): Promise<Paginated<Schedule>>;
};
