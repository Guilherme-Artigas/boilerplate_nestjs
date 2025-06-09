import { Company } from '../../../domain/entities/company';

export class CompanyResponseDto {
  id: string;
  name: string;
  responsibleId: string;

  constructor(id: string, name: string, responsibleId: string) {
    this.id = id;
    this.name = name;
    this.responsibleId = responsibleId;
  }

  static fromDomain(company: Company): CompanyResponseDto {
    return new CompanyResponseDto(
      company.id,
      company.name,
      company.responsibleId,
    );
  }
}
