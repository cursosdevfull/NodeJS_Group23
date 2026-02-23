import { DatabaseBootstrap } from "@core/bootstraps/database.bootstrap";
import { IdDto, PaginationDto } from "@shared/dtos";
import { validationSchemes } from "@shared/middlewares";
import express from "express";
import { RoleData } from "../adapters/persistence/role.entity";
import { RoleAdapter } from "../adapters/role.adapter";
import { RoleApplication } from "../application/role.application";
import { RolePort } from "../ports/role.port";
import { RoleCreateDto, RoleUpdateDto } from "./dtos";
import { RoleController } from "./role.controller";

class RoleRoutes {
  router: express.Router;

  constructor(private readonly controller: RoleController) {
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
        validator: RoleCreateDto,
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
          validator: RoleUpdateDto,
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

export const createRoleRouter = (): express.Router => {
  const roleRepository = DatabaseBootstrap.dataSource.getRepository(RoleData);
  const port: RolePort = new RoleAdapter(roleRepository);
  const application = new RoleApplication(port);
  const controller = new RoleController(application);
  return new RoleRoutes(controller).router;
};

export const router = createRoleRouter();
