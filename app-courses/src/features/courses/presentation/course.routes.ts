import { DatabaseBootstrap } from "@core/bootstraps/database.bootstrap";
import { IdDto, PaginationDto } from "@shared/dtos";
import { validationSchemes } from "@shared/middlewares";
import express from "express";
import { CourseAdapter } from "../adapters/course.adapter";
import { CourseData } from "../adapters/persistence/course.entity";
import { CourseApplication } from "../application/course.application";
import { CoursePort } from "../ports/course.port";
import { CourseController } from "./course.controller";
import { CourseCreateDto, CourseUpdateDto } from "./dtos";

class CourseRoutes {
  router: express.Router;
  application: any;

  constructor(private readonly controller: CourseController) {
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

    this.router.post(
      "/",
      validationSchemes({
        validator: CourseCreateDto,
        kindOfParameters: "body",
      }),
      this.controller.create.bind(this.controller),
    );

    this.router.put(
      "/:id",
      validationSchemes(
        {
          validator: IdDto,
          kindOfParameters: "params",
        },
        {
          validator: CourseUpdateDto,
          kindOfParameters: "body",
        },
      ),
      this.controller.update.bind(this.controller),
    );

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

export const createCourseRouter = (): express.Router => {
  const courseRepository =
    DatabaseBootstrap.dataSource.getRepository(CourseData);
  const port: CoursePort = new CourseAdapter(courseRepository);
  const application = new CourseApplication(port);
  const controller = new CourseController(application);
  return new CourseRoutes(controller).router;
};

export const router = createCourseRouter();
