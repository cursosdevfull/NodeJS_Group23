import { DomainValidationException } from "@shared/exceptions";

type CoursePropsEssential = {
  title: string;
};

type CoursePropsOptional = {
  id: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CourseProps = CoursePropsEssential & Partial<CoursePropsOptional>;
export type CourseUpdateProps = CoursePropsEssential;

export class Course {
  private readonly id?: number;
  private title: string;
  private active!: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;

  constructor(props: CourseProps) {
    if (props.id) this.id = props.id;
    if (props.updatedAt) this.updatedAt = props.updatedAt;
    this.active = props.active ?? true;
    this.createdAt = props.createdAt ?? new Date();

    if (props.title.trim().length === 0) {
      throw new DomainValidationException("Title cannot be empty");
    }
    if (props.title.length < 3 || props.title.length > 255) {
      throw new DomainValidationException(
        "Title must be between 3 and 255 characters long",
      );
    }
    this.title = props.title;
  }

  delete() {
    this.active = false;
    this.updatedAt = new Date();
  }

  update(props: CourseUpdateProps) {
    if (props.title && props.title.trim().length === 0) {
      throw new DomainValidationException("Title cannot be empty");
    }
    if (props.title && (props.title.length < 3 || props.title.length > 255)) {
      throw new DomainValidationException(
        "Title must be between 3 and 255 characters long",
      );
    }

    Object.assign(this, props);
    this.updatedAt = new Date();
  }

  get properties(): CourseProps {
    return {
      id: this.id,
      title: this.title,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
