import { Session, SessionUpdateProps } from "../domain/session";
import { SessionPort } from "../ports/session.port";

export class SessionApplication {
  constructor(private readonly port: SessionPort) {}

  create(props: {
    sessionDate: Date;
    hours: number;
    videos: string[];
    scheduleId: number;
  }) {
    const session = new Session(props);
    return this.port.save(session);
  }

  async update(id: number, props: SessionUpdateProps) {
    const session = await this.port.findById(id);
    if (!session) {
      throw new Error("Session not found");
    }
    session.update(props);
    await this.port.save(session);
    return session.properties;
  }

  async delete(id: number) {
    const session = await this.port.findById(id);
    if (!session) {
      throw new Error("Session not found");
    }
    session.delete();
    await this.port.save(session);
  }

  findById(id: number) {
    return this.port.findById(id);
  }

  findAll() {
    return this.port.findAll();
  }

  getByPage(page: number, limit: number) {
    return this.port.getByPage(page, limit);
  }
}
