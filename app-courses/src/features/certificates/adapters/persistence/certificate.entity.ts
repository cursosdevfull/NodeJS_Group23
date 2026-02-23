import { CommonEntity } from "@core/extends/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "certificates" })
export class CertificateData extends CommonEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ type: "timestamp" })
  public emissionDate!: Date;

  @Column({ type: "varchar", length: 255, unique: true })
  public codeKey!: string;

  @Column({ type: "int" })
  public studentId!: number;

  @Column({ type: "int" })
  public scheduleId!: number;
}
