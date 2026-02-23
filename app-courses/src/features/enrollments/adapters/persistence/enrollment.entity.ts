import { CommonEntity } from "@core/extends/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "enrollments" })
export class EnrollmentData extends CommonEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ type: "timestamp" })
  public enrollmentDate!: Date;

  @Column({ type: "int" })
  public studentId!: number;

  @Column({ type: "int" })
  public scheduleId!: number;
}
