import { Schedule } from "../entities/schedule";

type PropsEssential = {
    sessionDate: Date;
    hours: number;
    videos: string[];
    schedule: Schedule;
}

type PropsOptional = {
    id: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type SessionProps = PropsEssential & Partial<PropsOptional>;
export type SessionUpdateProps = Partial<PropsEssential>

export class Session {
    private readonly id?: number;
    private sessionDate: Date;
    private hours: number;
    private videos: string[];
    private active!: boolean;
    private readonly createdAt: Date;
    private updatedAt: Date | undefined;
    private schedule: Schedule;

    constructor(props: SessionProps) {
        if (props.id) this.id = props.id;
        if (props.updatedAt) this.updatedAt = props.updatedAt;
        this.active = props.active ?? true;
        this.createdAt = props.createdAt ?? new Date();

        if (props.hours <= 0) {
            throw "Hours must be greater than 0";
        }

        this.sessionDate = props.sessionDate;
        this.hours = props.hours;
        this.videos = props.videos || [];
        this.schedule = props.schedule;
    }

    delete() {
        this.active = false;
        this.updatedAt = new Date();
    }

    update(props: SessionUpdateProps) {
        if (props.sessionDate) this.sessionDate = props.sessionDate;
        if (props.hours && props.hours <= 0) {
            throw "Hours must be greater than 0";
        }

        Object.assign(this, props);
        this.updatedAt = new Date();
    }

    get properties(): SessionProps {
        return {
            id: this.id,
            sessionDate: this.sessionDate,
            hours: this.hours,
            videos: this.videos,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            schedule: this.schedule,
        };
    }
}