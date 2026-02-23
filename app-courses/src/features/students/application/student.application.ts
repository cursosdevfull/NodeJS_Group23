import { Student, StudentUpdateProps } from "../domain/student";
import { StudentPort } from "../ports/student.port";

export class StudentApplication {
  constructor(private readonly port: StudentPort) {}

  create(props: {
    name: string;
    lastname: string;
    nickname: string;
    phone: string;
    email: string;
    countryCode: any;
  }) {
    const student = new Student(props);
    return this.port.save(student);
  }

  async update(id: number, props: StudentUpdateProps) {
    const student = await this.port.findById(id);

    if (!student) {
      throw new Error("Student not found");
    }
    student.update(props);
    await this.port.save(student);
    return student.properties;
  }

  async delete(id: number) {
    const student = await this.port.findById(id);
    if (!student) {
      throw new Error("Student not found");
    }
    student.delete();
    await this.port.save(student);
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
