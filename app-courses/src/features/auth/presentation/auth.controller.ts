import {
  DomainValidationException,
  GenericException,
} from "@shared/exceptions";
import { Request, Response } from "express";
import { AuthApplication } from "../application/auth.application";
import { Auth } from "../domain/auth";

export class AuthController {
  constructor(private readonly application: AuthApplication) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const auth = new Auth({ email, password });

      const result = await this.application.login(auth);

      if (!result) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json({ accessToken: result });
    } catch (error) {
      if (error instanceof DomainValidationException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof GenericException) {
        res
          .status(error.status)
          .json({ message: error.message, stack: error.stack });
      } else {
        res.status(500).json({
          message: (error as Error).message,
          stack: (error as Error).stack,
        });
      }
    }
  }
}
