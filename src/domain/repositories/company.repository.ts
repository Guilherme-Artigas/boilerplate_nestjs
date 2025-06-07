import { Company } from '../entities/company';

export abstract class CompanyRepository {
  abstract findAll(): Promise<Company[]>;
  abstract create(company: Company): Promise<void>;
  abstract findOne(id: string): Promise<Company | null>;
  abstract delete(id: string): Promise<void | null>;
}
