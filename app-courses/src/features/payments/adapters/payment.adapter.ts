import { Paginated } from "@core/types";
import { GenericException } from "@shared/exceptions/generic.exception";
import { Repository } from "typeorm";
import { Payment } from "../domain/payment";
import { PaymentPort } from "../ports/payment.port";
import { PaymentDto } from "./dtos";
import { PaymentData } from "./persistence/payment.entity";

export class PaymentAdapter implements PaymentPort {
  constructor(private readonly paymentRepository: Repository<PaymentData>) {}

  async save(payment: Payment): Promise<Payment> {
    try {
      const data = PaymentDto.fromDomainToData(payment) as PaymentData;
      await this.paymentRepository.save(data);
      return payment;
    } catch (error) {
      console.log("Error in PaymentAdapter.save:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findById(id: number): Promise<Payment | null> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: { id, active: true },
      });
      return payment ? (PaymentDto.fromDataToDomain(payment) as Payment) : null;
    } catch (error) {
      console.log("Error in PaymentAdapter.findById:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findAll(): Promise<Payment[]> {
    try {
      const data = await this.paymentRepository.find({
        where: { active: true },
      });
      return PaymentDto.fromDataToDomain(data) as Payment[];
    } catch (error) {
      console.log("Error in PaymentAdapter.findAll:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async getByPage(page: number, limit: number): Promise<Paginated<Payment>> {
    try {
      const [data, total] = await this.paymentRepository.findAndCount({
        where: { active: true },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        items: PaymentDto.fromDataToDomain(data) as Payment[],
        total,
        page,
        limit,
      };
    } catch (error) {
      console.log("Error in PaymentAdapter.getByPage:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }
}
