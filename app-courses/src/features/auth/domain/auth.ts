import { DomainValidationException } from "@shared/exceptions";

type AuthProps = {
  email: string;
  password: string;
};

export class Auth {
  private email: string;
  private password: string;

  constructor({ email, password }: AuthProps) {
    if (!email || !password) {
      throw new DomainValidationException(
        "Email and password must not be empty",
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new DomainValidationException("Invalid email format");
    }

    this.email = email;
    this.password = password;
  }

  get properties(): AuthProps {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
