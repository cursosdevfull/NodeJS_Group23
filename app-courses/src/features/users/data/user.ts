import { Role } from "../entities/role";

export class UserData {
    public id?: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public roles!: Role[];
    public active!: boolean;
    public createdAt!: Date;
    public updatedAt: Date | undefined;
}