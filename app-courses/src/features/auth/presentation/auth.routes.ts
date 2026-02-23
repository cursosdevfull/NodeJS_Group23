import { DatabaseBootstrap } from "@core/bootstraps/database.bootstrap";
import { UserData } from "@features/users/adapters/persistence/user.entity";
import express from "express";
import { AuthAdapter } from "../adapters/auth.adapter";
import { AuthApplication } from "../application/auth.application";
import { AuthPort } from "../ports/auth.port";
import { AuthController } from "./auth.controller";

class AuthRoutes {
  router: express.Router;
  application: any;

  constructor(private readonly controller: AuthController) {
    this.router = express.Router();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.router.post("/login", this.controller.login.bind(this.controller));
  }
}

export const createAuthRouter = (): express.Router => {
  const userRepository = DatabaseBootstrap.dataSource.getRepository(UserData);
  const port: AuthPort = new AuthAdapter(userRepository);
  const application = new AuthApplication(port);
  const controller = new AuthController(application);
  return new AuthRoutes(controller).router;
};
