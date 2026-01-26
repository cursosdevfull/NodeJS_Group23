import { Course } from "../entities/course";
import { Teacher } from "../entities/teacher";

export class ScheduleData {
    public id?: number;
    public title!: string;
    public urlImage!: string;
    public duration!: number;
    public goals!: string[];
    public syllabus!: string[];
    public requirements!: string[];
    public frequency!: string;
    public rangeHours!: string;
    public start: Date | undefined;
    public slogan!: string;
    public course!: Course;
    public teacher!: Teacher;
    public active!: boolean;
    public createdAt!: Date;
    public updatedAt: Date | undefined;
}
