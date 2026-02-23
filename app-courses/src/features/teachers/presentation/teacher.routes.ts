import { DatabaseBootstrap } from "@core/bootstraps/database.bootstrap";
import { IdDto, PaginationDto } from "@shared/dtos";
import { validationSchemes } from "@shared/middlewares";
import express from "express";
import { TeacherData } from "../adapters/persistence/teacher.entity";
import { TeacherAdapter } from "../adapters/teacher.adapter";
import { TeacherApplication } from "../application/teacher.application";
import { TeacherPort } from "../ports/teacher.port";
import { TeacherController } from "./teacher.controller";

class TeacherRoutes {
  router: express.Router;

  constructor(private readonly controller: TeacherController) {
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

export const createTeacherRouter = (): express.Router => {
  const teacherRepository =
    DatabaseBootstrap.dataSource.getRepository(TeacherData);
  const port: TeacherPort = new TeacherAdapter(teacherRepository);
  const application = new TeacherApplication(port);
  const controller = new TeacherController(application);
  return new TeacherRoutes(controller).router;
};

export const router = createTeacherRouter();
