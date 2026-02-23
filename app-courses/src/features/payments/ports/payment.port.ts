import { Paginated } from "@core/types";
import { Payment } from "../domain/payment";

export type PaymentPort = {
  save(payment: Payment): Promise<Payment>;
  findById(id: number): Promise<Payment | null>;
  findAll(): Promise<Payment[]>;
  getByPage(page: number, limit: number): Promise<Paginated<Payment>>;
};
