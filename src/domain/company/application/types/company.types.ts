import { Manager } from '@domain/company/enterprise/entities/Manager';
import { ManagerDto } from './manager.types';

export type CompanyDto = {
  id: string;
  name: string;
  cnpj: string;
  manager: ManagerDto;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateCompanyInputDto = {
  name: string;
  cnpj: string;
  managerId: string;
};

export type CreateCompanyOutputDto = {
  id: string;
  name: string;
  cnpj: string;
  manager: Manager;
  createdAt: Date;
  updatedAt: Date;
};

export type GetCompanyByIdInputDto = {
  id: string;
};

export type GetCompanyByIdOutputDto = {
  id: string;
  name: string;
  cnpj: string;
  manager: Manager;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateCompanyInputDto = Partial<CompanyDto>;
export type UpdateCompanyOutputDto = CreateCompanyOutputDto;

export type DeleteCompanyInputDto = {
  id: string;
};

export type DeleteCompanyOutputDto = {
  id: string;
  name: string;
  cnpj: string;
  manager: Manager;
  createdAt: Date;
  updatedAt: Date;
};

export type GetAllCompaniesOutputDto = {
  id: string;
  name: string;
  cnpj: string;
  manager: Manager;
  createdAt: Date;
  updatedAt: Date;
}[];
