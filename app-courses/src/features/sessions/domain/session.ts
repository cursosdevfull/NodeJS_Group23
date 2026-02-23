import { DomainValidationException } from "@shared/exceptions/domain-validation.exception";

type PropsEssential = {
  sessionDate: Date;
  hours: number;
  videos: string[];
  scheduleId: number;
};

type PropsOptional = {
  id: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SessionProps = PropsEssential & Partial<PropsOptional>;
export type SessionUpdateProps = Partial<PropsEssential>;

export class Session {
  private readonly id?: number;
  private sessionDate: Date;
  private hours: number;
  private videos: string[];
  private active!: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;
  private scheduleId: number;

  constructor(props: SessionProps) {
    if (props.id) this.id = props.id;
    if (props.updatedAt) this.updatedAt = props.updatedAt;
    this.active = props.active ?? true;
    this.createdAt = props.createdAt ?? new Date();

    if (props.hours <= 0) {
      throw new DomainValidationException("Hours must be greater than 0");
    }

    this.sessionDate = props.sessionDate;
    this.hours = props.hours;
    this.videos = props.videos || [];
    this.scheduleId = props.scheduleId;
  }

  delete() {
    this.active = false;
    this.updatedAt = new Date();
  }

  update(props: SessionUpdateProps) {
    if (props.sessionDate) this.sessionDate = props.sessionDate;
    if (props.hours && props.hours <= 0) {
      throw new DomainValidationException("Hours must be greater than 0");
    }

    if (props.hours) this.hours = props.hours;
    if (props.videos) this.videos = props.videos;
    if (props.scheduleId) this.scheduleId = props.scheduleId;
    this.updatedAt = new Date();
  }

  get properties(): SessionProps {
    return {
      id: this.id,
      sessionDate: this.sessionDate,
      hours: this.hours,
      videos: this.videos,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      scheduleId: this.scheduleId,
    };
  }
}
