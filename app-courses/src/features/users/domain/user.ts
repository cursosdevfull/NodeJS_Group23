import { DomainValidationException } from "@shared/exceptions";
import { Role } from "./role";

type UserPropsEssential = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: Role[];
};

type UserPropsOptional = {
  id: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UserProps = UserPropsEssential & Partial<UserPropsOptional>;
export type UserUpdateProps = Partial<UserPropsEssential>;

export class User {
  private readonly id?: number;
  private name: string;
  private lastname: string;
  private email: string;
  private password: string;
  private active!: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;
  private roles: Role[];

  constructor(props: UserProps) {
    if (props.id) this.id = props.id;
    if (props.updatedAt) this.updatedAt = props.updatedAt;
    this.active = props.active ?? true;
    this.createdAt = props.createdAt ?? new Date();

    if (props.name.trim().length === 0) {
      throw new DomainValidationException("Name cannot be empty");
    }

    if (props.lastname.trim().length === 0) {
      throw new DomainValidationException("Lastname cannot be empty");
    }

    if (props.email.trim().length === 0) {
      throw new DomainValidationException("Email cannot be empty");
    }

    if (props.password.trim().length === 0) {
      throw new DomainValidationException("Password cannot be empty");
    }

    this.name = props.name;
    this.lastname = props.lastname;
    this.email = props.email;
    this.password = props.password;
    this.roles = props.roles;
  }

  delete() {
    this.active = false;
    this.updatedAt = new Date();
  }

  update(props: UserUpdateProps) {
    if (props.name && props.name.trim().length === 0) {
      throw new DomainValidationException("Name cannot be empty");
    }

    if (props.lastname && props.lastname.trim().length === 0) {
      throw new DomainValidationException("Lastname cannot be empty");
    }

    if (props.email && props.email.trim().length === 0) {
      throw new DomainValidationException("Email cannot be empty");
    }

    if (props.password && props.password.trim().length === 0) {
      throw new DomainValidationException("Password cannot be empty");
    }

    Object.assign(this, props);
    this.updatedAt = new Date();
  }

  get properties(): UserProps {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      roles: this.roles,
    };
  }
}
