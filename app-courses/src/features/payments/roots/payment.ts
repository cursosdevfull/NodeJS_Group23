import { Schedule } from "../entities/schedule";
import { Student } from "../entities/student";

enum PaymentCurrency {
    USD = "USD",
    PEN = "PEN",
}

type PAYMENT_CURRENCY = keyof typeof PaymentCurrency;

type PropsEssential = {
    amount: number;
    currency: PAYMENT_CURRENCY;
    paymentDate: Date;
    student: Student;
    schedule: Schedule;
}

type PropsOptional = {
    id: number;
    note: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type PaymentProps = PropsEssential & Partial<PropsOptional>;
export type PaymentUpdateProps = Partial<PropsEssential & Pick<PropsOptional, "note">>

export class Payment {
    private readonly id?: number;
    private amount: number;
    private currency: PAYMENT_CURRENCY;
    private note: string | undefined;
    private paymentDate: Date;
    private active!: boolean
    private readonly createdAt: Date;
    private updatedAt: Date | undefined;
    private student: Student;
    private schedule: Schedule;

    constructor(props: PaymentProps) {
        if (props.id) this.id = props.id;
        if (props.updatedAt) this.updatedAt = props.updatedAt;
        this.active = props.active ?? true;
        this.createdAt = props.createdAt ?? new Date();

        if (props.amount <= 0) {
            throw "Amount must be greater than 0";
        }

        this.amount = props.amount;
        this.currency = props.currency;
        this.paymentDate = props.paymentDate;
        this.student = props.student;
        this.schedule = props.schedule;
        if (props.note) this.note = props.note;
    }

    delete() {
        this.active = false;
        this.updatedAt = new Date();
    }

    update(props: PaymentUpdateProps) {
        if (props.amount && props.amount <= 0) {
            throw "Amount must be greater than 0";
        }
        Object.assign(this, props);
        this.updatedAt = new Date();
    }

    get properties(): PaymentProps {
        return {
            id: this.id,
            amount: this.amount,
            currency: this.currency,
            note: this.note,
            paymentDate: this.paymentDate,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            student: this.student,
            schedule: this.schedule,
        };
    }
}    