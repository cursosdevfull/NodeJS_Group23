import { Payment, PaymentUpdateProps } from "../domain/payment";
import { PaymentPort } from "../ports/payment.port";

export class PaymentApplication {
  constructor(private readonly port: PaymentPort) {}

  create(props: {
    amount: number;
    currency: "USD" | "PEN";
    paymentDate: Date;
    studentId: number;
    scheduleId: number;
    note?: string;
  }) {
    const payment = new Payment(props);
    return this.port.save(payment);
  }

  async update(id: number, props: PaymentUpdateProps) {
    const payment = await this.port.findById(id);
    if (!payment) {
      throw new Error("Payment not found");
    }
    payment.update(props);
    await this.port.save(payment);
    return payment.properties;
  }

  async delete(id: number) {
    const payment = await this.port.findById(id);
    if (!payment) {
      throw new Error("Payment not found");
    }
    payment.delete();
    await this.port.save(payment);
  }

  findById(id: number) {
    return this.port.findById(id);
  }

  findAll() {
    return this.port.findAll();
  }

  getByPage(page: number, limit: number) {
    return this.port.getByPage(page, limit);
  }
}
