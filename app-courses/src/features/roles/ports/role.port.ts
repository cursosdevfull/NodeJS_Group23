import { Paginated } from "@core/types";
import { Role } from "../domain/role";

export type RolePort = {
  save(role: Role): Promise<Role>;
  findById(id: number): Promise<Role | null>;
  findAll(): Promise<Role[]>;
  getByPage(page: number, limit: number): Promise<Paginated<Role>>;
};
