import { Paginated } from "@core/types";
import { Session } from "../domain/session";

export type SessionPort = {
  save(session: Session): Promise<Session>;
  findById(id: number): Promise<Session | null>;
  findAll(): Promise<Session[]>;
  getByPage(page: number, limit: number): Promise<Paginated<Session>>;
};
