export class StudentData {
    public id?: number;
    public name!: string;
    public lastname!: string;
    public nickname!: string;
    public phone!: string;
    public email!: string;
    public countryCode!: string;
    public active!: boolean;
    public createdAt!: Date;
    public updatedAt: Date | undefined;
}