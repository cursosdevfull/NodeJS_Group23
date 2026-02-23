import { DomainValidationException } from "@shared/exceptions";

type PropsEssential = {
  name: string;
};

type PropsOptional = {
  id: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type RoleProps = PropsEssential & Partial<PropsOptional>;
export type RoleUpdateProps = PropsEssential;

export class Role {
  private readonly id?: number;
  private name: string;
  private active: boolean;
  private readonly createdAt!: Date;
  private updatedAt: Date | undefined;

  constructor(props: RoleProps) {
    if (props.id) this.id = props.id;
    if (props.updatedAt) this.updatedAt = props.updatedAt;
    this.active = props.active ?? true;
    this.createdAt = props.createdAt ?? new Date();

    if (props.name.trim().length < 3 || props.name.trim().length > 50) {
      throw new DomainValidationException(
        "Name must be between 3 and 50 characters long",
      );
    }
    this.name = props.name;
  }

  delete() {
    this.active = false;
    this.updatedAt = new Date();
  }

  update(props: RoleUpdateProps) {
    if (props.name.trim().length < 3 || props.name.trim().length > 50) {
      throw new DomainValidationException(
        "Name must be between 3 and 50 characters long",
      );
    }

    this.name = props.name;
    this.updatedAt = new Date();
  }

  get properties(): RoleProps {
    return {
      id: this.id,
      name: this.name,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
