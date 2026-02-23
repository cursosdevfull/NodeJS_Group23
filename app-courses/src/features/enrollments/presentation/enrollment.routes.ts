import { DatabaseBootstrap } from "@core/bootstraps/database.bootstrap";
import { IdDto, PaginationDto } from "@shared/dtos";
import { validationSchemes } from "@shared/middlewares";
import express from "express";
import { EnrollmentAdapter } from "../adapters/enrollment.adapter";
import { EnrollmentData } from "../adapters/persistence/enrollment.entity";
import { EnrollmentApplication } from "../application/enrollment.application";
import { EnrollmentPort } from "../ports/enrollment.port";
import { EnrollmentController } from "./enrollment.controller";

class EnrollmentRoutes {
  router: express.Router;

  constructor(private readonly controller: EnrollmentController) {
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

export const createEnrollmentRouter = (): express.Router => {
  const enrollmentRepository =
    DatabaseBootstrap.dataSource.getRepository(EnrollmentData);
  const port: EnrollmentPort = new EnrollmentAdapter(enrollmentRepository);
  const application = new EnrollmentApplication(port);
  const controller = new EnrollmentController(application);
  return new EnrollmentRoutes(controller).router;
};

export const router = createEnrollmentRouter();
