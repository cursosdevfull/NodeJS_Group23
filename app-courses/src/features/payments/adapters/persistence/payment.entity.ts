import { CommonEntity } from "@core/extends/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "payments" })
export class PaymentData extends CommonEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  public amount!: number;

  @Column({ type: "varchar", length: 10 })
  public currency!: string;

  @Column({ type: "text", nullable: true })
  public note?: string;

  @Column({ type: "timestamp" })
  public paymentDate!: Date;

  @Column({ type: "int" })
  public studentId!: number;

  @Column({ type: "int" })
  public scheduleId!: number;
}
