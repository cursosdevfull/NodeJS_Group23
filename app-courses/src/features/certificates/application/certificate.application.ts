import { Certificate, CertificateUpdateProps } from "../domain/certificate";
import { CertificatePort } from "../ports/certificate.port";

export class CertificateApplication {
  constructor(private readonly port: CertificatePort) {}

  create(props: {
    emissionDate: Date;
    codeKey: string;
    studentId: number;
    scheduleId: number;
  }) {
    const certificate = new Certificate(props);
    return this.port.save(certificate);
  }

  async update(id: number, props: CertificateUpdateProps) {
    const certificate = await this.port.findById(id);
    if (!certificate) {
      throw new Error("Certificate not found");
    }
    certificate.update(props);
    await this.port.save(certificate);
    return certificate.properties;
  }

  async delete(id: number) {
    const certificate = await this.port.findById(id);
    if (!certificate) {
      throw new Error("Certificate not found");
    }
    certificate.delete();
    await this.port.save(certificate);
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
