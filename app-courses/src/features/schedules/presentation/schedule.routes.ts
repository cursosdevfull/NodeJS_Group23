import { DatabaseBootstrap } from "@core/bootstraps/database.bootstrap";
import { IdDto, PaginationDto } from "@shared/dtos";
import { validationSchemes } from "@shared/middlewares";
import express from "express";
import { ScheduleData } from "../adapters/persistence/schedule.entity";
import { ScheduleAdapter } from "../adapters/schedule.adapter";
import { ScheduleApplication } from "../application/schedule.application";
import { SchedulePort } from "../ports/schedule.port";
import { ScheduleController } from "./schedule.controller";

class ScheduleRoutes {
  router: express.Router;

  constructor(private readonly controller: ScheduleController) {
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

export const createScheduleRouter = (): express.Router => {
  const scheduleRepository =
    DatabaseBootstrap.dataSource.getRepository(ScheduleData);
  const port: SchedulePort = new ScheduleAdapter(scheduleRepository);
  const application = new ScheduleApplication(port);
  const controller = new ScheduleController(application);
  return new ScheduleRoutes(controller).router;
};

export const router = createScheduleRouter();
