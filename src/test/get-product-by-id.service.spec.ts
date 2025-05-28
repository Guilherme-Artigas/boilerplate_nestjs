import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetProductByIdService } from '../products/services/get-product-by-id.service';
import { Products } from '../models/products.entity';
import { NotFoundException } from '@nestjs/common';

describe('GetProductByIdService', () => {
  let service: GetProductByIdService;
  let repository: Repository<Products>;

  const mockProduct = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    value: 100,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    company: {
      id: '1',
      name: 'Test Company',
      phone: '123456789',
      email: 'test@company.com',
      document: '123456789',
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProductByIdService,
        {
          provide: getRepositoryToken(Products),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GetProductByIdService>(GetProductByIdService);
    repository = module.get<Repository<Products>>(getRepositoryToken(Products));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return a product when found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockProduct as unknown as Products);

      const result = await service.execute('1');

      expect(result).toEqual(mockProduct);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['company'],
      });
    });

    it('should throw NotFoundException when product is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.execute('1')).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['company'],
      });
    });
  });
});
