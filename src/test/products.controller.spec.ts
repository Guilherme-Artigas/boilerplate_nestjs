import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products/controllers/products.controller';
import { CreateProductService } from '../products/services/create-product.service';
import { ListProductsService } from '../products/services/list-products.service';
import { UpdateProductService } from '../products/services/update-product.service';
import { DeleteProductsService } from '../products/services/delete-products.service';
import { GetProductByIdService } from '../products/services/get-product-by-id.service';
import { Products } from '../models/products.entity';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { ListProductsDto } from '../products/dto/list-products.dto';
import { Company } from '../models/company.entity';

describe('ProductsController', () => {
  let controller: ProductsController;
  let createProductService: CreateProductService;
  let listProductsService: ListProductsService;
  let updateProductService: UpdateProductService;
  let deleteProductService: DeleteProductsService;

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

  const mockProduct: Products = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    value: 99.99,
    isAvailable: true,
    company: mockCompany,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCreateProductService = {
    execute: jest.fn().mockResolvedValue(mockProduct),
  };

  const mockListProductsService = {
    execute: jest.fn().mockResolvedValue({ data: [mockProduct], total: 1 }),
  };

  const mockUpdateProductService = {
    execute: jest.fn().mockResolvedValue(mockProduct),
  };

  const mockDeleteProductService = {
    execute: jest.fn().mockResolvedValue(mockProduct),
  };

  const mockGetProductByIdService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        { provide: CreateProductService, useValue: mockCreateProductService },
        { provide: ListProductsService, useValue: mockListProductsService },
        { provide: UpdateProductService, useValue: mockUpdateProductService },
        { provide: DeleteProductsService, useValue: mockDeleteProductService },
        { provide: GetProductByIdService, useValue: mockGetProductByIdService },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    createProductService = module.get<CreateProductService>(CreateProductService);
    listProductsService = module.get<ListProductsService>(ListProductsService);
    updateProductService = module.get<UpdateProductService>(UpdateProductService);
    deleteProductService = module.get<DeleteProductsService>(DeleteProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        companyId: '1',
      };

      const result = await controller.create(createProductDto);

      expect(createProductService.execute).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return a list of products', async () => {
      const query: ListProductsDto = {
        page: 1,
        limit: 10,
      };

      const result = await controller.findAll(query);

      expect(listProductsService.execute).toHaveBeenCalledWith(query);
      expect(result).toEqual({ data: [mockProduct], total: 1 });
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
      };

      const result = await controller.update('1', updateProductDto);

      expect(updateProductService.execute).toHaveBeenCalledWith('1', updateProductDto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      const result = await controller.remove('1');

      expect(deleteProductService.execute).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const mockProduct = {
        id: '1',
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        company: mockCompany,
      };

      mockGetProductByIdService.execute.mockResolvedValue(mockProduct);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockProduct);
      expect(mockGetProductByIdService.execute).toHaveBeenCalledWith('1');
    });
  });
});
