import { DomainValidationException } from "@shared/exceptions";

export enum CountryCode {
  CL = "CL",
  AR = "AR",
  PE = "PE",
  UY = "UY",
  CO = "CO",
  MX = "MX",
  US = "US",
  EC = "EC",
}

export type COUNTRY_CODE = keyof typeof CountryCode;

type PropsEssential = {
  name: string;
  lastname: string;
  nickname: string;
  phone: string;
  email: string;
  countryCode: COUNTRY_CODE;
};

type PropsOptional = {
  id: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type StudentProps = PropsEssential & Partial<PropsOptional>;
export type StudentUpdateProps = Partial<Omit<PropsEssential, "email">>;

export class Student {
  private readonly id?: number;
  private name: string;
  private lastname: string;
  private nickname: string;
  private phone: string;
  private email: string;
  private countryCode: COUNTRY_CODE;
  private active!: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;

  constructor(props: StudentProps) {
    if (props.id) this.id = props.id;
    if (props.updatedAt) this.updatedAt = props.updatedAt;
    this.active = props.active ?? true;
    this.createdAt = props.createdAt ?? new Date();

    if (props.name.trim().length < 3 || props.name.trim().length > 255) {
      throw new DomainValidationException(
        "Name must be between 3 and 255 characters long",
      );
    }

    if (
      props.lastname.trim().length < 3 ||
      props.lastname.trim().length > 255
    ) {
      throw new DomainValidationException(
        "Lastname must be between 3 and 255 characters long",
      );
    }

    if (props.nickname.trim().length < 3 || props.nickname.trim().length > 20) {
      throw new DomainValidationException(
        "Nickname must be between 3 and 20 characters long",
      );
    }

    if (props.phone.trim().length < 7 || props.phone.trim().length > 15) {
      throw new DomainValidationException(
        "Phone must be between 7 and 15 characters long",
      );
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(props.email)) {
      throw new DomainValidationException("Email is not valid");
    }

    this.name = props.name;
    this.lastname = props.lastname;
    this.nickname = props.nickname;
    this.phone = props.phone;
    this.email = props.email;
    this.countryCode = props.countryCode;
  }

  delete() {
    this.active = false;
    this.updatedAt = new Date();
  }

  update(props: StudentUpdateProps) {
    if (
      props.name &&
      (props.name.trim().length < 3 || props.name.trim().length > 255)
    ) {
      throw new DomainValidationException(
        "Name must be between 3 and 255 characters long",
      );
    }

    if (
      props.lastname &&
      (props.lastname.trim().length < 3 || props.lastname.trim().length > 255)
    ) {
      throw new DomainValidationException(
        "Lastname must be between 3 and 255 characters long",
      );
    }

    if (
      props.nickname &&
      (props.nickname.trim().length < 3 || props.nickname.trim().length > 20)
    ) {
      throw new DomainValidationException(
        "Nickname must be between 3 and 20 characters long",
      );
    }

    if (
      props.phone &&
      (props.phone.trim().length < 7 || props.phone.trim().length > 15)
    ) {
      throw new DomainValidationException(
        "Phone must be between 7 and 15 characters long",
      );
    }

    Object.assign(this, props);
    this.updatedAt = new Date();
  }

  get properties(): StudentProps {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      nickname: this.nickname,
      phone: this.phone,
      email: this.email,
      countryCode: this.countryCode,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
