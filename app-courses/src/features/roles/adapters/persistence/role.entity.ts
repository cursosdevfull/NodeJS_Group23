import { CommonEntity } from "@core/extends";
import { UserData } from "@features/users/adapters/persistence/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "roles" })
export class RoleData extends CommonEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ type: "varchar", length: 255 })
  public name!: string;

  @ManyToMany(() => UserData, (user) => user.roles)
  users!: UserData[];
}
