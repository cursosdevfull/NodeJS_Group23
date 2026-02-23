import { Paginated } from "@core/types";
import { GenericException } from "@shared/exceptions/generic.exception";
import { Repository } from "typeorm";
import { Certificate } from "../domain/certificate";
import { CertificatePort } from "../ports/certificate.port";
import { CertificateDto } from "./dtos";
import { CertificateData } from "./persistence/certificate.entity";

export class CertificateAdapter implements CertificatePort {
  constructor(
    private readonly certificateRepository: Repository<CertificateData>,
  ) {}

  async save(certificate: Certificate): Promise<Certificate> {
    try {
      const data = CertificateDto.fromDomainToData(
        certificate,
      ) as CertificateData;
      await this.certificateRepository.save(data);
      return certificate;
    } catch (error) {
      console.log("Error in CertificateAdapter.save:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findById(id: number): Promise<Certificate | null> {
    try {
      const certificate = await this.certificateRepository.findOne({
        where: { id, active: true },
      });
      return certificate
        ? (CertificateDto.fromDataToDomain(certificate) as Certificate)
        : null;
    } catch (error) {
      console.log("Error in CertificateAdapter.findById:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async findAll(): Promise<Certificate[]> {
    try {
      const data = await this.certificateRepository.find({
        where: { active: true },
      });
      return CertificateDto.fromDataToDomain(data) as Certificate[];
    } catch (error) {
      console.log("Error in CertificateAdapter.findAll:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }

  async getByPage(
    page: number,
    limit: number,
  ): Promise<Paginated<Certificate>> {
    try {
      const [data, total] = await this.certificateRepository.findAndCount({
        where: { active: true },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        items: CertificateDto.fromDataToDomain(data) as Certificate[],
        total,
        page,
        limit,
      };
    } catch (error) {
      console.log("Error in CertificateAdapter.getByPage:", error);
      throw new GenericException(500, "Method not implemented", "");
    }
  }
}
