import { Cypher } from "@shared/utils";
import { User, UserUpdateProps } from "../domain/user";
import { UserPort } from "../ports/user.port";

export class UserApplication {
  constructor(private readonly port: UserPort) {}

  async create(props: {
    name: string;
    lastname: string;
    email: string;
    password: string;
    roles: { id: number }[];
  }) {
    const hashedPassword = await Cypher.hashPassword(props.password);

    const user = new User({ ...props, password: hashedPassword });
    return this.port.save(user);
  }

  async update(id: number, props: UserUpdateProps) {
    const user = await this.port.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (props.password) {
      props.password = await Cypher.hashPassword(props.password);
    }

    user.update(props);
    this.port.save(user);
    return user.properties;
  }

  async delete(id: number) {
    const user = await this.port.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    user.delete();
    await this.port.save(user);
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
