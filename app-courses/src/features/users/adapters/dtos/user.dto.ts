import { plainToInstance } from "class-transformer";
import { Role } from "../../domain/role";
import { User } from "../../domain/user";
import { UserData } from "../persistence/user.entity";

export class UserDto {
  static fromDomainToData(domain: User | User[]): UserData | UserData[] {
    if (Array.isArray(domain)) {
      return domain.map((user) => UserDto.fromDomainToData(user) as UserData);
    }

    return plainToInstance(UserData, domain.properties);
  }

  static fromDataToDomain(data: UserData | UserData[]): User | User[] {
    if (Array.isArray(data)) {
      return data.map((user) => UserDto.fromDataToDomain(user) as User);
    }

    // Convertir RoleData[] a Role[]
    const roles: Role[] = (data.roles || []).map((roleData) => {
      const role = new Role();
      role.id = roleData.id!;
      role.name = roleData.name;
      return role;
    });

    return new User({
      id: data.id,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      roles,
    });
  }
}
