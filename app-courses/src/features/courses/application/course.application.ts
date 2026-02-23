import { Course, CourseUpdateProps } from "../domain/course";
import { CoursePort } from "../ports/course.port";

export class CourseApplication {
  constructor(private readonly port: CoursePort) {}

  create(props: { title: string }) {
    const course = new Course(props);
    return this.port.save(course);
  }

  async update(id: number, props: CourseUpdateProps) {
    const course = await this.port.findById(id);

    if (!course) {
      throw new Error("Course not found");
    }
    course.update(props);
    await this.port.save(course);
    return course.properties;
  }

  async delete(id: number) {
    const course = await this.port.findById(id);
    if (!course) {
      throw new Error("Course not found");
    }
    course.delete();
    await this.port.save(course);
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
