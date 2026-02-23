import { Paginated } from "@core/types";
import { GenericException } from "@shared/exceptions/generic.exception";
import { Repository } from "typeorm";
import { Session } from "../domain/session";
import { SessionPort } from "../ports/session.port";
import { SessionDto } from "./dtos";
import { SessionData } from "./persistence/session.entity";

export class SessionAdapter implements SessionPort {
  constructor(private readonly sessionRepository: Repository<SessionData>) {}

  async save(session: Session): Promise<Session> {
    try {
      const data = SessionDto.fromDomainToData(session) as SessionData;
      await this.sessionRepository.save(data);
      return session;
    } catch (error) {
      console.log("Error in SessionAdapter.save:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findById(id: number): Promise<Session | null> {
    try {
      const session = await this.sessionRepository.findOne({
        where: { id, active: true },
      });
      return session ? (SessionDto.fromDataToDomain(session) as Session) : null;
    } catch (error) {
      console.log("Error in SessionAdapter.findById:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findAll(): Promise<Session[]> {
    try {
      const data = await this.sessionRepository.find({
        where: { active: true },
      });
      return SessionDto.fromDataToDomain(data) as Session[];
    } catch (error) {
      console.log("Error in SessionAdapter.findAll:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async getByPage(page: number, limit: number): Promise<Paginated<Session>> {
    try {
      const [data, total] = await this.sessionRepository.findAndCount({
        where: { active: true },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        items: SessionDto.fromDataToDomain(data) as Session[],
        total,
        page,
        limit,
      };
    } catch (error) {
      console.log("Error in SessionAdapter.getByPage:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }
}
