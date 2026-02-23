import {
  DomainValidationException,
  GenericException,
} from "@shared/exceptions";
import { Request, Response } from "express";
import { PaymentApplication } from "../application/payment.application";

export class PaymentController {
  constructor(private readonly application: PaymentApplication) {}

  async create(req: Request, res: Response) {
    try {
      const result = await this.application.create(req.body);
      res.json(result);
    } catch (error) {
      if (error instanceof DomainValidationException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof GenericException) {
        res
          .status(error.status)
          .json({ message: error.message, stack: error.stack });
      } else {
        res.status(500).json({
          message: (error as Error).message,
          stack: (error as Error).stack,
        });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await this.application.update(
        Number(req.params.id),
        req.body,
      );
      res.json(result);
    } catch (error) {
      if (error instanceof DomainValidationException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof GenericException) {
        res
          .status(error.status)
          .json({ message: error.message, stack: error.stack });
      } else {
        res.status(500).json({
          message: (error as Error).message,
          stack: (error as Error).stack,
        });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const result = await this.application.delete(Number(req.params.id));
      res.json(result);
    } catch (error) {
      if (error instanceof DomainValidationException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof GenericException) {
        res
          .status(error.status)
          .json({ message: error.message, stack: error.stack });
      } else {
        res.status(500).json({
          message: (error as Error).message,
          stack: (error as Error).stack,
        });
      }
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const result = await this.application.findById(Number(req.params.id));
      res.json(result);
    } catch (error) {
      if (error instanceof DomainValidationException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof GenericException) {
        res
          .status(error.status)
          .json({ message: error.message, stack: error.stack });
      } else {
        res.status(500).json({
          message: (error as Error).message,
          stack: (error as Error).stack,
        });
      }
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await this.application.findAll();
      res.json(result);
    } catch (error) {
      if (error instanceof DomainValidationException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof GenericException) {
        res
          .status(error.status)
          .json({ message: error.message, stack: error.stack });
      } else {
        res.status(500).json({
          message: (error as Error).message,
          stack: (error as Error).stack,
        });
      }
    }
  }

  async getByPage(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const result = await this.application.getByPage(page, limit);
      res.json(result);
    } catch (error) {
      if (error instanceof DomainValidationException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof GenericException) {
        res
          .status(error.status)
          .json({ message: error.message, stack: error.stack });
      } else {
        res.status(500).json({
          message: (error as Error).message,
          stack: (error as Error).stack,
        });
      }
    }
  }
}
