import { plainToInstance } from "class-transformer";
import { Payment, PAYMENT_CURRENCY } from "../../domain/payment";
import { PaymentData } from "../persistence/payment.entity";

export class PaymentDto {
  static fromDomainToData(
    domain: Payment | Payment[],
  ): PaymentData | PaymentData[] {
    if (Array.isArray(domain)) {
      return domain.map(
        (payment) => PaymentDto.fromDomainToData(payment) as PaymentData,
      );
    }

    return plainToInstance(PaymentData, domain.properties);
  }

  static fromDataToDomain(
    data: PaymentData | PaymentData[],
  ): Payment | Payment[] {
    if (Array.isArray(data)) {
      return data.map(
        (payment) => PaymentDto.fromDataToDomain(payment) as Payment,
      );
    }

    return new Payment({
      id: data.id,
      amount: data.amount,
      currency: data.currency as PAYMENT_CURRENCY,
      note: data.note,
      paymentDate: data.paymentDate,
      studentId: data.studentId,
      scheduleId: data.scheduleId,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
