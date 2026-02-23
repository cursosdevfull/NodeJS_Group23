import { Teacher, TeacherUpdateProps } from "../domain/teacher";
import { TeacherPort } from "../ports/teacher.port";

export class TeacherApplication {
  constructor(private readonly port: TeacherPort) {}

  create(props: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    linkedinUrl: string;
    summary: string;
    photoUrl: string;
    skills: string[];
  }) {
    const teacher = new Teacher(props);
    return this.port.save(teacher);
  }

  async update(id: number, props: TeacherUpdateProps) {
    const teacher = await this.port.findById(id);
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    teacher.update(props);
    await this.port.save(teacher);
    return teacher.properties;
  }

  async delete(id: number) {
    const teacher = await this.port.findById(id);
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    teacher.delete();
    await this.port.save(teacher);
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
