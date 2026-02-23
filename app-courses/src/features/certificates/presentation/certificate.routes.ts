import { DatabaseBootstrap } from "@core/bootstraps/database.bootstrap";
import { IdDto, PaginationDto } from "@shared/dtos";
import { validationSchemes } from "@shared/middlewares";
import express from "express";
import { CertificateAdapter } from "../adapters/certificate.adapter";
import { CertificateData } from "../adapters/persistence/certificate.entity";
import { CertificateApplication } from "../application/certificate.application";
import { CertificatePort } from "../ports/certificate.port";
import { CertificateController } from "./certificate.controller";

class CertificateRoutes {
  router: express.Router;

  constructor(private readonly controller: CertificateController) {
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

export const createCertificateRouter = (): express.Router => {
  const certificateRepository =
    DatabaseBootstrap.dataSource.getRepository(CertificateData);
  const port: CertificatePort = new CertificateAdapter(certificateRepository);
  const application = new CertificateApplication(port);
  const controller = new CertificateController(application);
  return new CertificateRoutes(controller).router;
};

export const router = createCertificateRouter();
