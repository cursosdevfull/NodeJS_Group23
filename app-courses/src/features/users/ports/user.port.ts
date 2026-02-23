import { Paginated } from "@core/types";
import { User } from "../domain/user";

export type UserPort = {
  save(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  getByPage(page: number, limit: number): Promise<Paginated<User>>;
};
