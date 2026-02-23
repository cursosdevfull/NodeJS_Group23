import { plainToInstance } from "class-transformer";
import { Certificate } from "../../domain/certificate";
import { CertificateData } from "../persistence/certificate.entity";

export class CertificateDto {
  static fromDomainToData(
    domain: Certificate | Certificate[],
  ): CertificateData | CertificateData[] {
    if (Array.isArray(domain)) {
      return domain.map(
        (certificate) =>
          CertificateDto.fromDomainToData(certificate) as CertificateData,
      );
    }

    return plainToInstance(CertificateData, domain.properties);
  }

  static fromDataToDomain(
    data: CertificateData | CertificateData[],
  ): Certificate | Certificate[] {
    if (Array.isArray(data)) {
      return data.map(
        (certificate) =>
          CertificateDto.fromDataToDomain(certificate) as Certificate,
      );
    }

    return new Certificate({
      id: data.id,
      emissionDate: data.emissionDate,
      codeKey: data.codeKey,
      studentId: data.studentId,
      scheduleId: data.scheduleId,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
