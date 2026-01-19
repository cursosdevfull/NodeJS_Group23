import { Role } from "../entities/role";

type PropsEssential = {
    name: string;
    email: string;
    password: string;
    roles: Role[];
};

type PropsOptional = {
    id: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type UserProps = PropsEssential & Partial<PropsOptional>;
export type UserUpdateProps = Partial<Omit<PropsEssential, "email">>

export class User {
    private readonly id?: number;
    private name: string;
    private email: string;
    private password: string;
    private active!: boolean
    private readonly createdAt: Date;
    private updatedAt: Date | undefined;
    private roles!: Role[];

    constructor(props: UserProps) {
        if (props.id) this.id = props.id;
        if (props.updatedAt) this.updatedAt = props.updatedAt;
        this.active = props.active ?? true;
        this.createdAt = props.createdAt ?? new Date();

        if (props.name.trim().length < 3 || props.name.trim().length > 255) {
            throw "Name must be between 3 and 255 characters long";
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(props.email)) {
            throw "Email is not valid";
        }

        if (props.password.length < 6 || props.password.length > 128) {
            throw "Password must be between 6 and 128 characters long";
        }

        if (props.roles.length === 0) {
            throw "User must have at least one role";
        }

        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.roles = props.roles ?? [];
    }

    delete() {
        this.active = false;
        this.updatedAt = new Date();
    }

    update(props: UserUpdateProps) {
        if (props.name && (props.name.trim().length < 3 || props.name.trim().length > 255)) {
            throw "Name must be between 3 and 255 characters long";
        }

        if (props.password && (props.password.length < 6 || props.password.length > 128)) {
            throw "Password must be between 6 and 128 characters long";
        }

        if (props.roles && props.roles.length === 0) {
            throw "User must have at least one role";
        }

        Object.assign(this, props);
        this.updatedAt = new Date();
    }

    get properties(): UserProps {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            roles: this.roles,
        };
    }
}