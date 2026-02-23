import { Paginated } from "@core/types";
import { GenericException } from "@shared/exceptions/generic.exception";
import { Repository } from "typeorm";
import { Role } from "../domain/role";
import { RolePort } from "../ports/role.port";
import { RoleDto } from "./dtos";
import { RoleData } from "./persistence/role.entity";

export class RoleAdapter implements RolePort {
  constructor(private readonly roleRepository: Repository<RoleData>) {}

  async save(role: Role): Promise<Role> {
    try {
      const data = RoleDto.fromDomainToData(role) as RoleData;
      await this.roleRepository.save(data);

      return role;
    } catch (error) {
      console.log("Error in RoleAdapter.save:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findById(id: number): Promise<Role | null> {
    try {
      const role = await this.roleRepository.findOne({
        where: { id, active: true },
      });

      return role ? (RoleDto.fromDataToDomain(role) as Role) : null;
    } catch (error) {
      console.log("Error in RoleAdapter.findById:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findAll(): Promise<Role[]> {
    try {
      const data = await this.roleRepository.find({ where: { active: true } });

      return RoleDto.fromDataToDomain(data) as Role[];
    } catch (error) {
      console.log("Error in RoleAdapter.findAll:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async getByPage(page: number, limit: number): Promise<Paginated<Role>> {
    try {
      const [data, total] = await this.roleRepository.findAndCount({
        where: { active: true },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        items: RoleDto.fromDataToDomain(data) as Role[],
        total,
        page,
        limit,
      };
    } catch (error) {
      console.log("Error in RoleAdapter.getByPage:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }
}
