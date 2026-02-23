import { Paginated } from "@core/types";
import { Certificate } from "../domain/certificate";

export type CertificatePort = {
  save(certificate: Certificate): Promise<Certificate>;
  findById(id: number): Promise<Certificate | null>;
  findAll(): Promise<Certificate[]>;
  getByPage(page: number, limit: number): Promise<Paginated<Certificate>>;
};
