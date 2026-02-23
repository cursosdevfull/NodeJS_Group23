import { Role, RoleUpdateProps } from "../domain/role";
import { RolePort } from "../ports/role.port";

export class RoleApplication {
  constructor(private readonly port: RolePort) {}

  create(props: { name: string }) {
    const role = new Role(props);
    return this.port.save(role);
  }

  async update(id: number, props: RoleUpdateProps) {
    const role = await this.port.findById(id);

    if (!role) {
      throw new Error("Role not found");
    }
    role.update(props);
    await this.port.save(role);
    return role.properties;
  }

  async delete(id: number) {
    const role = await this.port.findById(id);
    if (!role) {
      throw new Error("Role not found");
    }
    role.delete();
    await this.port.save(role);
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
