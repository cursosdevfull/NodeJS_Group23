import { Schedule, ScheduleUpdateProps } from "../domain/schedule";
import { SchedulePort } from "../ports/schedule.port";

export class ScheduleApplication {
  constructor(private readonly port: SchedulePort) {}

  create(props: {
    title: string;
    urlImage: string;
    duration: number;
    courseId: number;
    teacherId: number;
    goals?: string[];
    syllabus?: string[];
    requirements?: string[];
    frequency?: string;
    rangeHours?: string;
    start?: Date;
    slogan?: string;
  }) {
    const schedule = new Schedule(props);
    return this.port.save(schedule);
  }

  async update(id: number, props: ScheduleUpdateProps) {
    const schedule = await this.port.findById(id);
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    schedule.update(props);
    await this.port.save(schedule);
    return schedule.properties;
  }

  async delete(id: number) {
    const schedule = await this.port.findById(id);
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    schedule.delete();
    await this.port.save(schedule);
  }

  findById(id: number) {
    return this.port.findById(id);
  }

  findAll() {
    return this.port.findAll();
  }

  getByPage(page: number, limit: number) {
    return this.port.getByPage(page, limit);
  }
}
