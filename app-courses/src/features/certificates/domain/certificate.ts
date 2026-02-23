import { DomainValidationException } from "@shared/exceptions/domain-validation.exception";

type PropsEssential = {
  emissionDate: Date;
  codeKey: string;
  studentId: number;
  scheduleId: number;
};

type PropsOptional = {
  id: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CertificateProps = PropsEssential & Partial<PropsOptional>;
export type CertificateUpdateProps = Partial<PropsEssential>;

export class Certificate {
  private readonly id?: number;
  private emissionDate: Date;
  private codeKey: string;
  private active!: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;
  private studentId: number;
  private scheduleId: number;

  constructor(props: CertificateProps) {
    if (props.id) this.id = props.id;
    if (props.updatedAt) this.updatedAt = props.updatedAt;
    this.active = props.active ?? true;
    this.createdAt = props.createdAt ?? new Date();

    if (!props.codeKey || props.codeKey.trim().length === 0) {
      throw new DomainValidationException(
        "Code key is required and cannot be empty",
      );
    }

    this.emissionDate = props.emissionDate;
    this.codeKey = props.codeKey.trim();
    this.studentId = props.studentId;
    this.scheduleId = props.scheduleId;
  }

  delete() {
    this.active = false;
    this.updatedAt = new Date();
  }

  update(props: CertificateUpdateProps) {
    if (props.emissionDate) this.emissionDate = props.emissionDate;
    if (props.codeKey && props.codeKey.trim().length === 0) {
      throw new DomainValidationException("Code key cannot be empty");
    }

    if (props.codeKey) this.codeKey = props.codeKey.trim();
    if (props.studentId) this.studentId = props.studentId;
    if (props.scheduleId) this.scheduleId = props.scheduleId;
    this.updatedAt = new Date();
  }

  get properties(): CertificateProps {
    return {
      id: this.id,
      emissionDate: this.emissionDate,
      codeKey: this.codeKey,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      studentId: this.studentId,
      scheduleId: this.scheduleId,
    };
  }
}
