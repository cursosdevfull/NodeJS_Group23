import { Schedule } from "../entities/schedule";
import { Student } from "../entities/student";

export class EnrollmentData {
    public id?: number;
    public enrollmentDate!: Date;
    public student!: Student;
    public schedule!: Schedule;
    public active!: boolean;
    public createdAt!: Date;
    public updatedAt: Date | undefined;
}
