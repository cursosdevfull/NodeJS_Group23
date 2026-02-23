import { plainToInstance } from "class-transformer";
import { Role } from "../../domain/role";
import { RoleData } from "../persistence/role.entity";

export class RoleDto {
  static fromDomainToData(domain: Role | Role[]): RoleData | RoleData[] {
    if (Array.isArray(domain)) {
      return domain.map((role) => RoleDto.fromDomainToData(role) as RoleData);
    }

    return plainToInstance(RoleData, domain.properties);
  }

  static fromDataToDomain(data: RoleData | RoleData[]): Role | Role[] {
    if (Array.isArray(data)) {
      return data.map((role) => RoleDto.fromDataToDomain(role) as Role);
    }

    return new Role({
      id: data.id,
      name: data.name,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
