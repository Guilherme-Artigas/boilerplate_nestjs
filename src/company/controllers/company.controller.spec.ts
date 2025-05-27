import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CreateCompanyService } from '../services/create-company.service';
import { ListCompanyService } from '../services/list-company.service';
import { GetCompanyByIdService } from '../services/get-company-by-id.service';
import { UpdateCompanyService } from '../services/update-company.service';
import { DeleteCompanyService } from '../services/delete-company.service';
import { Company } from '../../models/company.entity';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { ListCompanyDto } from '../dto/list-company.dto';

describe('CompanyController', () => {
  let controller: CompanyController;
  let createCompanyService: CreateCompanyService;
  let listCompanyService: ListCompanyService;
  let getCompanyByIdService: GetCompanyByIdService;
  let updateCompanyService: UpdateCompanyService;
  let deleteCompanyService: DeleteCompanyService;

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
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    createCompanyService = module.get<CreateCompanyService>(CreateCompanyService);
    listCompanyService = module.get<ListCompanyService>(ListCompanyService);
    getCompanyByIdService = module.get<GetCompanyByIdService>(GetCompanyByIdService);
    updateCompanyService = module.get<UpdateCompanyService>(UpdateCompanyService);
    deleteCompanyService = module.get<DeleteCompanyService>(DeleteCompanyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new company', async () => {
      const createCompanyDto: CreateCompanyDto = {
        name: 'Test Company',
        document: '12345678901234',
        email: 'test@company.com',
        phone: '1234567890',
      };

      const result = await controller.create(createCompanyDto);

      expect(createCompanyService.execute).toHaveBeenCalledWith(createCompanyDto);
      expect(result).toEqual(mockCompany);
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
      };

      const result = await controller.update('1', updateCompanyDto);

      expect(updateCompanyService.execute).toHaveBeenCalledWith('1', updateCompanyDto);
      expect(result).toEqual(mockCompany);
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
