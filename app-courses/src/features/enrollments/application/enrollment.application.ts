import { Enrollment, EnrollmentUpdateProps } from "../domain/enrollment";
import { EnrollmentPort } from "../ports/enrollment.port";

export class EnrollmentApplication {
  constructor(private readonly port: EnrollmentPort) {}

  create(props: {
    enrollmentDate: Date;
    studentId: number;
    scheduleId: number;
  }) {
    const enrollment = new Enrollment(props);
    return this.port.save(enrollment);
  }

  async update(id: number, props: EnrollmentUpdateProps) {
    const enrollment = await this.port.findById(id);
    if (!enrollment) {
      throw new Error("Enrollment not found");
    }
    enrollment.update(props);
    await this.port.save(enrollment);
    return enrollment.properties;
  }

  async delete(id: number) {
    const enrollment = await this.port.findById(id);
    if (!enrollment) {
      throw new Error("Enrollment not found");
    }
    enrollment.delete();
    await this.port.save(enrollment);
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
