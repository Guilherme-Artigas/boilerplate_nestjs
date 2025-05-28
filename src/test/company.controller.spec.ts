import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from '../company/controllers/company.controller';
import { CreateCompanyService } from '../company/services/create-company.service';
import { ListCompanyService } from '../company/services/list-company.service';
import { GetCompanyByIdService } from '../company/services/get-company-by-id.service';
import { UpdateCompanyService } from '../company/services/update-company.service';
import { DeleteCompanyService } from '../company/services/delete-company.service';
import { Company } from '../models/company.entity';
import { CreateCompanyDto } from '../company/dto/create-company.dto';
import { UpdateCompanyDto } from '../company/dto/update-company.dto';
import { ListCompanyDto } from '../company/dto/list-company.dto';
import { BadRequestException } from '@nestjs/common';
import { DocumentValidatorPipe } from '../pipes/document-validator.pipe';

describe('CompanyController', () => {
  let controller: CompanyController;
  let createCompanyService: CreateCompanyService;
  let listCompanyService: ListCompanyService;
  let getCompanyByIdService: GetCompanyByIdService;
  let updateCompanyService: UpdateCompanyService;
  let deleteCompanyService: DeleteCompanyService;
  let documentValidatorPipe: DocumentValidatorPipe;

  const mockCompany: Company = {
    id: '1',
    name: 'Test Company',
    document: '12345678901234',
    email: 'test@company.com',
    phone: '1234567890',
    isAvailable: true,
    products: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCreateCompanyService = {
    execute: jest.fn().mockResolvedValue(mockCompany),
  };

  const mockListCompanyService = {
    execute: jest.fn().mockResolvedValue({ data: [mockCompany], total: 1 }),
  };

  const mockGetCompanyByIdService = {
    execute: jest.fn().mockResolvedValue(mockCompany),
  };

  const mockUpdateCompanyService = {
    execute: jest.fn().mockResolvedValue(mockCompany),
  };

  const mockDeleteCompanyService = {
    execute: jest.fn().mockResolvedValue(mockCompany),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        { provide: CreateCompanyService, useValue: mockCreateCompanyService },
        { provide: ListCompanyService, useValue: mockListCompanyService },
        { provide: GetCompanyByIdService, useValue: mockGetCompanyByIdService },
        { provide: UpdateCompanyService, useValue: mockUpdateCompanyService },
        { provide: DeleteCompanyService, useValue: mockDeleteCompanyService },
        DocumentValidatorPipe,
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    createCompanyService = module.get<CreateCompanyService>(CreateCompanyService);
    listCompanyService = module.get<ListCompanyService>(ListCompanyService);
    getCompanyByIdService = module.get<GetCompanyByIdService>(GetCompanyByIdService);
    updateCompanyService = module.get<UpdateCompanyService>(UpdateCompanyService);
    deleteCompanyService = module.get<DeleteCompanyService>(DeleteCompanyService);
    documentValidatorPipe = module.get<DocumentValidatorPipe>(DocumentValidatorPipe);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new company', async () => {
      const createCompanyDto: CreateCompanyDto = {
        name: 'Test Company',
        email: 'test@company.com',
        document: '529.982.247-25', // valid CPF
        phone: '11987654321',
      };

      const result = await controller.create(createCompanyDto);

      expect(createCompanyService.execute).toHaveBeenCalledWith(createCompanyDto);
      expect(result).toEqual(mockCompany);
    });

    it('should throw BadRequestException when creating with invalid CPF', () => {
      const createCompanyDto: CreateCompanyDto = {
        name: 'Test Company',
        email: 'test@company.com',
        document: '123.456.789-00', // invalid CPF
        phone: '11987654321',
      };

      expect(() => documentValidatorPipe.transform(createCompanyDto.document)).toThrow(
        BadRequestException,
      );
      expect(() => documentValidatorPipe.transform(createCompanyDto.document)).toThrow(
        'Invalid CPF',
      );
    });

    it('should throw BadRequestException when creating with invalid CNPJ', () => {
      const createCompanyDto: CreateCompanyDto = {
        name: 'Test Company',
        email: 'test@company.com',
        document: '12.345.678/0001-90', // invalid CNPJ
        phone: '11987654321',
      };

      expect(() => documentValidatorPipe.transform(createCompanyDto.document)).toThrow(
        BadRequestException,
      );
      expect(() => documentValidatorPipe.transform(createCompanyDto.document)).toThrow(
        'Invalid CNPJ',
      );
    });
  });

  describe('findAll', () => {
    it('should return a list of companies', async () => {
      const query: ListCompanyDto = {
        page: 1,
        limit: 10,
      };

      const result = await controller.findAll(query);

      expect(listCompanyService.execute).toHaveBeenCalledWith(query);
      expect(result).toEqual({ data: [mockCompany], total: 1 });
    });
  });

  describe('findOne', () => {
    it('should return a company by id', async () => {
      const result = await controller.findOne('1');

      expect(getCompanyByIdService.execute).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockCompany);
    });
  });

  describe('update', () => {
    it('should update a company', async () => {
      const updateCompanyDto: UpdateCompanyDto = {
        name: 'Updated Company',
        document: '33.014.556/0001-96', // valid CPF
      };

      const result = await controller.update('1', updateCompanyDto);

      expect(updateCompanyService.execute).toHaveBeenCalledWith('1', updateCompanyDto);
      expect(result).toEqual(mockCompany);
    });

    it('should throw BadRequestException when updating with invalid CPF', () => {
      const updateCompanyDto: UpdateCompanyDto = {
        name: 'Updated Company',
        document: '111.111.111-11', // invalid CPF
      };

      expect(() => documentValidatorPipe.transform(updateCompanyDto.document)).toThrow(
        BadRequestException,
      );
      expect(() => documentValidatorPipe.transform(updateCompanyDto.document)).toThrow(
        'Invalid CPF',
      );
    });

    it('should throw BadRequestException when updating with invalid CNPJ', () => {
      const updateCompanyDto: UpdateCompanyDto = {
        name: 'Updated Company',
        document: '11.111.111/1111-11', // invalid CNPJ
      };

      expect(() => documentValidatorPipe.transform(updateCompanyDto.document)).toThrow(
        BadRequestException,
      );
      expect(() => documentValidatorPipe.transform(updateCompanyDto.document)).toThrow(
        'Invalid CNPJ',
      );
    });
  });

  describe('remove', () => {
    it('should delete a company', async () => {
      const result = await controller.remove('1');

      expect(deleteCompanyService.execute).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockCompany);
    });
  });
});
