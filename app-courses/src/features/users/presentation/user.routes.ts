import { DatabaseBootstrap } from "@core/bootstraps/database.bootstrap";
import { IdDto, PaginationDto } from "@shared/dtos";
import {
  cache,
  invalidationCache,
  validationSchemes,
} from "@shared/middlewares";
import { idempotency } from "@shared/middlewares/idempotency.middleware";
import express from "express";
import { UserData } from "../adapters/persistence/user.entity";
import { UserAdapter } from "../adapters/user.adapter";
import { UserApplication } from "../application/user.application";
import { UserPort } from "../ports/user.port";
import { UserCreateDto, UserUpdateDto } from "./dtos";
import { UserController } from "./user.controller";

class UserRoutes {
  router: express.Router;
  application: any;

  constructor(private readonly controller: UserController) {
    this.router = express.Router();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.router.get(
      "/",
      cache("users"),
      this.controller.findAll.bind(this.controller),
    );

    this.router.get(
      "/page",
      cache("users"),
      validationSchemes({
        validator: PaginationDto,
        kindOfParameters: "query",
      }),
      this.controller.getByPage.bind(this.controller),
    );

    this.router.get(
      "/:id",
      cache("users"),
      validationSchemes({
        validator: IdDto,
        kindOfParameters: "params",
      }),
      this.controller.findById.bind(this.controller),
    );

    this.router.post(
      "/",
      idempotency,
      invalidationCache("users"),
      validationSchemes({
        validator: UserCreateDto,
        kindOfParameters: "body",
      }),
      this.controller.create.bind(this.controller),
    );

    this.router.put(
      "/:id",
      invalidationCache("users"),
      validationSchemes(
        {
          validator: IdDto,
          kindOfParameters: "params",
        },
        {
          validator: UserUpdateDto,
          kindOfParameters: "body",
        },
      ),
      this.controller.update.bind(this.controller),
    );

    this.router.delete(
      "/:id",
      invalidationCache("users"),
      validationSchemes({
        validator: IdDto,
        kindOfParameters: "params",
      }),
      this.controller.delete.bind(this.controller),
    );
  }
}

export const createUserRouter = (): express.Router => {
  const userRepository = DatabaseBootstrap.dataSource.getRepository(UserData);
  const port: UserPort = new UserAdapter(userRepository);
  const application = new UserApplication(port);
  const controller = new UserController(application);
  return new UserRoutes(controller).router;
};
