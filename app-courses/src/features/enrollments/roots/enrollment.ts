import { Schedule } from "../entities/schedule";
import { Student } from "../entities/student";

type PropsEssential = {
    enrollmentDate: Date;
    student: Student;
    schedule: Schedule;
}

type PropsOptional = {
    id: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type EnrollmentProps = PropsEssential & Partial<PropsOptional>;
export type EnrollmentUpdateProps = Partial<PropsEssential>

export class Enrollment {
    private readonly id?: number;
    private enrollmentDate!: Date;
    private active!: boolean;
    private readonly createdAt!: Date
    private updatedAt: Date | undefined;
    private student: Student;
    private schedule: Schedule;

    constructor(props: EnrollmentProps) {
        if (props.id) this.id = props.id;
        if (props.updatedAt) this.updatedAt = props.updatedAt;
        this.active = props.active ?? true;
        this.createdAt = props.createdAt ?? new Date();

        this.enrollmentDate = props.enrollmentDate;
        this.student = props.student;
        this.schedule = props.schedule;
    }

    delete() {
        this.active = false;
        this.updatedAt = new Date();
    }

    update(props: EnrollmentUpdateProps) {
        if (props.enrollmentDate) this.enrollmentDate = props.enrollmentDate;
        if (props.student) this.student = props.student;
        if (props.schedule) this.schedule = props.schedule;
        this.updatedAt = new Date();
    }

    get properties(): EnrollmentProps {
        return {
            id: this.id,
            enrollmentDate: this.enrollmentDate,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            student: this.student,
            schedule: this.schedule,
        };
    }

}