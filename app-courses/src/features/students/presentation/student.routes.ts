import { DatabaseBootstrap } from "@core/bootstraps/database.bootstrap";
import { IdDto, PaginationDto } from "@shared/dtos";
import { validationSchemes } from "@shared/middlewares";
import express from "express";
import { StudentData } from "../adapters/persistence/student.entity";
import { StudentAdapter } from "../adapters/student.adapter";
import { StudentApplication } from "../application/student.application";
import { StudentPort } from "../ports/student.port";
import { StudentCreateDto, StudentUpdateDto } from "./dtos";
import { StudentController } from "./student.controller";

class StudentRoutes {
  router: express.Router;

  constructor(private readonly controller: StudentController) {
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
        validator: StudentCreateDto,
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
          validator: StudentUpdateDto,
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

export const createStudentRouter = (): express.Router => {
  const studentRepository =
    DatabaseBootstrap.dataSource.getRepository(StudentData);
  const port: StudentPort = new StudentAdapter(studentRepository);
  const application = new StudentApplication(port);
  const controller = new StudentController(application);
  return new StudentRoutes(controller).router;
};

export const router = createStudentRouter();
