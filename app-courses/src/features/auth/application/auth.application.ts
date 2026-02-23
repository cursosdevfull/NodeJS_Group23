import { Auth } from "../domain/auth";
import { AuthPort } from "../ports/auth.port";

export class AuthApplication {
  constructor(private readonly port: AuthPort) {}

  login(auth: Auth) {
    const { email, password } = auth.properties;
    return this.port.login(email, password);
  }
}
