export class TeacherData {
    public id?: number;
    public name!: string;
    public lastname!: string;
    public email!: string
    public phone!: string;
    public linkedinUrl!: string;
    public summary!: string;
    public photoUrl!: string;
    public skills!: string[];
    public active!: boolean;
    public createdAt!: Date;
    public updatedAt: Date | undefined;
}