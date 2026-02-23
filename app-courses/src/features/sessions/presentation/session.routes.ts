import { DatabaseBootstrap } from "@core/bootstraps/database.bootstrap";
import { IdDto, PaginationDto } from "@shared/dtos";
import { validationSchemes } from "@shared/middlewares";
import express from "express";
import { SessionData } from "../adapters/persistence/session.entity";
import { SessionAdapter } from "../adapters/session.adapter";
import { SessionApplication } from "../application/session.application";
import { SessionPort } from "../ports/session.port";
import { SessionController } from "./session.controller";

class SessionRoutes {
  router: express.Router;

  constructor(private readonly controller: SessionController) {
    this.router = express.Router();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.router.get("/", this.controller.findAll.bind(this.controller));

    this.router.get(
      "/page",
      validationSchemes({
        validator: PaginationDto,
        kindOfParameters: "query",
      }),
      this.controller.getByPage.bind(this.controller),
    );

    this.router.get(
      "/:id",
      validationSchemes({
        validator: IdDto,
        kindOfParameters: "params",
      }),
      this.controller.findById.bind(this.controller),
    );

    this.router.post("/", this.controller.create.bind(this.controller));

    this.router.put("/:id", this.controller.update.bind(this.controller));

    this.router.delete(
      "/:id",
      validationSchemes({
        validator: IdDto,
        kindOfParameters: "params",
      }),
      this.controller.delete.bind(this.controller),
    );
  }
}

export const createSessionRouter = (): express.Router => {
  const sessionRepository =
    DatabaseBootstrap.dataSource.getRepository(SessionData);
  const port: SessionPort = new SessionAdapter(sessionRepository);
  const application = new SessionApplication(port);
  const controller = new SessionController(application);
  return new SessionRoutes(controller).router;
};

export const router = createSessionRouter();
