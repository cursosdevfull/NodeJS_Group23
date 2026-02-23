import { CommonEntity } from "@core/extends/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "sessions" })
export class SessionData extends CommonEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ type: "timestamp" })
  public sessionDate!: Date;

  @Column({ type: "int" })
  public hours!: number;

  @Column({ type: "simple-array" })
  public videos!: string[];

  @Column({ type: "int" })
  public scheduleId!: number;
}
