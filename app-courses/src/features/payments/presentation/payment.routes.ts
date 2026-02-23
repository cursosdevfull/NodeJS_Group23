import { DatabaseBootstrap } from "@core/bootstraps/database.bootstrap";
import { IdDto, PaginationDto } from "@shared/dtos";
import { validationSchemes } from "@shared/middlewares";
import express from "express";
import { PaymentAdapter } from "../adapters/payment.adapter";
import { PaymentData } from "../adapters/persistence/payment.entity";
import { PaymentApplication } from "../application/payment.application";
import { PaymentPort } from "../ports/payment.port";
import { PaymentController } from "./payment.controller";

class PaymentRoutes {
  router: express.Router;

  constructor(private readonly controller: PaymentController) {
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

export const createPaymentRouter = (): express.Router => {
  const paymentRepository =
    DatabaseBootstrap.dataSource.getRepository(PaymentData);
  const port: PaymentPort = new PaymentAdapter(paymentRepository);
  const application = new PaymentApplication(port);
  const controller = new PaymentController(application);
  return new PaymentRoutes(controller).router;
};

export const router = createPaymentRouter();
