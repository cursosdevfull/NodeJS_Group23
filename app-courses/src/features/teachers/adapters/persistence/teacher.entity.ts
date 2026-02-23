import { CommonEntity } from "@core/extends/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "teachers" })
export class TeacherData extends CommonEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ type: "varchar", length: 255 })
  public name!: string;

  @Column({ type: "varchar", length: 255 })
  public lastname!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  public email!: string;

  @Column({ type: "varchar", length: 15 })
  public phone!: string;

  @Column({ type: "varchar", length: 500 })
  public linkedinUrl!: string;

  @Column({ type: "text" })
  public summary!: string;

  @Column({ type: "varchar", length: 500 })
  public photoUrl!: string;

  @Column({ type: "simple-array" })
  public skills!: string[];
}
