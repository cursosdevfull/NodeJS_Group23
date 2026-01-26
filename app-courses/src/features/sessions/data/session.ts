import { Schedule } from "../entities/schedule";

export class SessionData {
    public id?: number;
    public sessionDate!: Date;
    public hours!: number;
    public videos!: string[];
    public schedule!: Schedule;
    public active!: boolean;
    public createdAt!: Date;
    public updatedAt: Date | undefined;
}
