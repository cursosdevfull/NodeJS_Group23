import { CommonEntity } from "@core/extends/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "schedules" })
export class ScheduleData extends CommonEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ type: "varchar", length: 255 })
  public title!: string;

  @Column({ type: "varchar", length: 500 })
  public urlImage!: string;

  @Column({ type: "int" })
  public duration!: number;

  @Column({ type: "simple-array", nullable: true })
  public goals!: string[];

  @Column({ type: "simple-array", nullable: true })
  public syllabus!: string[];

  @Column({ type: "simple-array", nullable: true })
  public requirements!: string[];

  @Column({ type: "varchar", length: 255, nullable: true })
  public frequency!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  public rangeHours!: string;

  @Column({ type: "timestamp", nullable: true })
  public start?: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  public slogan!: string;

  @Column({ type: "int" })
  public teacherId!: number;

  @Column({ type: "int" })
  public courseId!: number;
}
