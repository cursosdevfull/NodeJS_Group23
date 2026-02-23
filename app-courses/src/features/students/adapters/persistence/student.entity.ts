import { CommonEntity } from "@core/extends/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "students" })
export class StudentData extends CommonEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ type: "varchar", length: 255 })
  public name!: string;

  @Column({ type: "varchar", length: 255 })
  public lastname!: string;

  @Column({ type: "varchar", length: 20 })
  public nickname!: string;

  @Column({ type: "varchar", length: 15 })
  public phone!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  public email!: string;

  @Column({ type: "varchar", length: 2 })
  public countryCode!: string;
}
