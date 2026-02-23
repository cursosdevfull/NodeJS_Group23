import { CommonEntity } from "@core/extends/common";
import { RoleData } from "@features/roles/adapters/persistence/role.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "users" })
export class UserData extends CommonEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ type: "varchar", length: 255 })
  public name!: string;

  @Column({ type: "varchar", length: 255 })
  public lastname!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  public email!: string;

  @Column({ type: "varchar", length: 255 })
  public password!: string;

  @ManyToMany(() => RoleData, (role) => role.users)
  @JoinTable({
    name: "user_roles",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
  })
  roles!: RoleData[];
}
