import { Paginated } from "@core/types";
import { GenericException } from "@shared/exceptions/generic.exception";
import { Repository } from "typeorm";
import { User } from "../domain/user";
import { UserPort } from "../ports/user.port";
import { UserDto } from "./dtos";
import { UserData } from "./persistence/user.entity";

export class UserAdapter implements UserPort {
  constructor(private readonly userRepository: Repository<UserData>) {}

  async save(user: User): Promise<User> {
    try {
      const data = UserDto.fromDomainToData(user) as UserData;
      await this.userRepository.save(data);

      return user;
    } catch (error) {
      console.log("Error in UserAdapter.create:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id, active: true },
      });

      return user ? (UserDto.fromDataToDomain(user) as User) : null;
    } catch (error) {
      console.log("Error in UserAdapter.findById:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const data = await this.userRepository.find({ where: { active: true } });
      console.log("Data retrieved from database:", data);

      return UserDto.fromDataToDomain(data) as User[];
    } catch (error) {
      console.log("Error in UserAdapter.findAll:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async getByPage(page: number, limit: number): Promise<Paginated<User>> {
    try {
      const [data, total] = await this.userRepository.findAndCount({
        where: { active: true },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        items: UserDto.fromDataToDomain(data) as User[],
        total,
        page,
        limit,
      };
    } catch (error) {
      console.log("Error in UserAdapter.getByPage:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }
}
