import { plainToInstance } from "class-transformer";
import { Session } from "../../domain/session";
import { SessionData } from "../persistence/session.entity";

export class SessionDto {
  static fromDomainToData(
    domain: Session | Session[],
  ): SessionData | SessionData[] {
    if (Array.isArray(domain)) {
      return domain.map(
        (session) => SessionDto.fromDomainToData(session) as SessionData,
      );
    }

    return plainToInstance(SessionData, domain.properties);
  }

  static fromDataToDomain(
    data: SessionData | SessionData[],
  ): Session | Session[] {
    if (Array.isArray(data)) {
      return data.map(
        (session) => SessionDto.fromDataToDomain(session) as Session,
      );
    }

    return new Session({
      id: data.id,
      sessionDate: data.sessionDate,
      hours: data.hours,
      videos: data.videos,
      scheduleId: data.scheduleId,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
