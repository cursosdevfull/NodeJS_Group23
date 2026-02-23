import { DomainValidationException } from "@shared/exceptions";

type PropsEssential = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  summary: string;
  photoUrl: string;
  skills: string[];
};

type PropsOptional = {
  id: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TeacherProps = PropsEssential & Partial<PropsOptional>;
export type TeacherUpdateProps = Partial<Omit<PropsEssential, "email">>;

export class Teacher {
  private readonly id?: number;
  private name: string;
  private lastname: string;
  private email: string;
  private phone: string;
  private linkedinUrl: string;
  private summary: string;
  private photoUrl: string;
  private skills: string[];
  private active!: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;

  constructor(props: TeacherProps) {
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

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(props.email)) {
      throw new DomainValidationException("Email is not valid");
    }

    if (props.phone.trim().length < 7 || props.phone.trim().length > 15) {
      throw new DomainValidationException(
        "Phone must be between 7 and 15 characters long",
      );
    }

    if (
      !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
        props.linkedinUrl,
      )
    ) {
      throw new DomainValidationException("LinkedIn URL is not valid");
    }

    if (
      props.summary.trim().length < 10 ||
      props.summary.trim().length > 2000
    ) {
      throw new DomainValidationException(
        "Summary must be between 10 and 2000 characters long",
      );
    }

    if (
      props.photoUrl &&
      !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)\.(jpg|jpeg|png|gif)(\?[a-zA-Z0-9&=_-]*)?$/i.test(
        props.photoUrl,
      )
    ) {
      throw new DomainValidationException(
        "Photo URL must be a valid image URL with jpg, jpeg, png, or gif extension",
      );
    }

    if (props.skills.length < 2) {
      throw new DomainValidationException("Skills must have at least 2 items");
    }

    this.name = props.name;
    this.lastname = props.lastname;
    this.email = props.email;
    this.phone = props.phone;
    this.linkedinUrl = props.linkedinUrl;
    this.summary = props.summary;
    this.photoUrl = props.photoUrl;
    this.skills = props.skills;
  }

  delete() {
    this.active = false;
    this.updatedAt = new Date();
  }

  update(props: TeacherUpdateProps) {
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
      props.phone &&
      (props.phone.trim().length < 7 || props.phone.trim().length > 15)
    ) {
      throw new DomainValidationException(
        "Phone must be between 7 and 15 characters long",
      );
    }

    if (
      props.linkedinUrl &&
      !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
        props.linkedinUrl,
      )
    ) {
      throw new DomainValidationException("LinkedIn URL is not valid");
    }

    if (
      props.summary &&
      (props.summary.trim().length < 10 || props.summary.trim().length > 2000)
    ) {
      throw new DomainValidationException(
        "Summary must be between 10 and 2000 characters long",
      );
    }

    if (
      props.photoUrl &&
      !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)\.(jpg|jpeg|png|gif)(\?[a-zA-Z0-9&=_-]*)?$/i.test(
        props.photoUrl,
      )
    ) {
      throw new DomainValidationException(
        "Photo URL must be a valid image URL with jpg, jpeg, png, or gif extension",
      );
    }

    if (props.skills && props.skills.length < 2) {
      throw new DomainValidationException("Skills must have at least 2 items");
    }

    Object.assign(this, props);
    this.updatedAt = new Date();
  }

  get properties(): TeacherProps {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      phone: this.phone,
      linkedinUrl: this.linkedinUrl,
      summary: this.summary,
      photoUrl: this.photoUrl,
      skills: this.skills,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
