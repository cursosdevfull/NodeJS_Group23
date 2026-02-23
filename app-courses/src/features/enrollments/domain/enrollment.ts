type PropsEssential = {
  enrollmentDate: Date;
  studentId: number;
  scheduleId: number;
};

type PropsOptional = {
  id: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type EnrollmentProps = PropsEssential & Partial<PropsOptional>;
export type EnrollmentUpdateProps = Partial<PropsEssential>;

export class Enrollment {
  private readonly id?: number;
  private enrollmentDate!: Date;
  private active!: boolean;
  private readonly createdAt!: Date;
  private updatedAt: Date | undefined;
  private studentId: number;
  private scheduleId: number;

  constructor(props: EnrollmentProps) {
    if (props.id) this.id = props.id;
    if (props.updatedAt) this.updatedAt = props.updatedAt;
    this.active = props.active ?? true;
    this.createdAt = props.createdAt ?? new Date();

    this.enrollmentDate = props.enrollmentDate;
    this.studentId = props.studentId;
    this.scheduleId = props.scheduleId;
  }

  delete() {
    this.active = false;
    this.updatedAt = new Date();
  }

  update(props: EnrollmentUpdateProps) {
    if (props.enrollmentDate) this.enrollmentDate = props.enrollmentDate;
    if (props.studentId) this.studentId = props.studentId;
    if (props.scheduleId) this.scheduleId = props.scheduleId;
    this.updatedAt = new Date();
  }

  get properties(): EnrollmentProps {
    return {
      id: this.id,
      enrollmentDate: this.enrollmentDate,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      studentId: this.studentId,
      scheduleId: this.scheduleId,
    };
  }
}
