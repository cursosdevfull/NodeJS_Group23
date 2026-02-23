import { generateAccessToken } from "@core/services/token";
import { UserData } from "@features/users/adapters/persistence/user.entity";
import { GenericException } from "@shared/exceptions/generic.exception";
import { Cypher } from "@shared/utils";
import { Repository } from "typeorm";
import { AuthPort } from "../../auth/ports/auth.port";

export class AuthAdapter implements AuthPort {
  constructor(private readonly userRepository: Repository<UserData>) {}

  async login(email: string, password: string): Promise<string | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { email, active: true },
        relations: ["roles"],
        select: {
          id: true,
          name: true,
          lastname: true,
          email: true,
          password: true,
          roles: {
            id: true,
            name: true,
          },
        },
      });

      if (!user) {
        return null;
      }

      const isPasswordValid = await Cypher.comparePassword(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        return null;
      }

      const { id, name, lastname, roles } = user;

      return generateAccessToken(id!, name, lastname, roles);
    } catch (error) {
      console.log("Error in AuthAdapter.login:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }
}
