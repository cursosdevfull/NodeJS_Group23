import { Schedule } from "../entities/schedule";
import { Student } from "../entities/student";

export class CertificateData {
    public id?: number;
    public emissionDate!: Date;
    public codeKey!: string;
    public student!: Student;
    public schedule!: Schedule;
    public active!: boolean;
    public createdAt!: Date;
    public updatedAt: Date | undefined;
}