import { Schedule } from "../entities/schedule";
import { Student } from "../entities/student";

type PropsEssential = {
    emissionDate: Date;
    codeKey: string;
    student: Student;
    schedule: Schedule;
}

type PropsOptional = {
    id: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type CertificateProps = PropsEssential & Partial<PropsOptional>;
export type CertificateUpdateProps = Partial<PropsEssential>

export class Certificate {
    private readonly id?: number;
    private emissionDate: Date;
    private codeKey: string;
    private active!: boolean;
    private readonly createdAt: Date;
    private updatedAt: Date | undefined;
    private student: Student;
    private schedule: Schedule;

    constructor(props: CertificateProps) {
        if (props.id) this.id = props.id;
        if (props.updatedAt) this.updatedAt = props.updatedAt;
        this.active = props.active ?? true;
        this.createdAt = props.createdAt ?? new Date();

        if (!props.codeKey || props.codeKey.trim().length === 0) {
            throw "Code key is required and cannot be empty";
        }

        this.emissionDate = props.emissionDate;
        this.codeKey = props.codeKey.trim();
        this.student = props.student;
        this.schedule = props.schedule;
    }

    delete() {
        this.active = false;
        this.updatedAt = new Date();
    }

    update(props: CertificateUpdateProps) {
        if (props.emissionDate) this.emissionDate = props.emissionDate;
        if (props.codeKey && props.codeKey.trim().length === 0) {
            throw "Code key cannot be empty";
        }

        Object.assign(this, props);
        this.updatedAt = new Date();
    }

    get properties(): CertificateProps {
        return {
            id: this.id,
            emissionDate: this.emissionDate,
            codeKey: this.codeKey,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            student: this.student,
            schedule: this.schedule
        }
    }
}