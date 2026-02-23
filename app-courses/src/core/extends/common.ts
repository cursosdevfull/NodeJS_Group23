import { Column } from "typeorm";

export abstract class CommonEntity {
  @Column({ type: "boolean", default: true })
  public active!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  public createdAt!: Date;

  @Column({ type: "timestamp", nullable: true })
  public updatedAt: Date | undefined;
}
