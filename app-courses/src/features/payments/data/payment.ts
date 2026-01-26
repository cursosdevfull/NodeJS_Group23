import { Schedule } from "../entities/schedule";
import { Student } from "../entities/student";

export class PaymentData {
    public id?: number;
    public amount!: number;
    public currency!: string;
    public note: string | undefined;
    public paymentDate!: Date;
    public student!: Student;
    public schedule!: Schedule;
    public active!: boolean;
    public createdAt!: Date;
    public updatedAt: Date | undefined;
}
