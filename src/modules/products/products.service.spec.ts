import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PRODUCT_REPOSITORY } from '@common/constants/repository.tokens';
import { Repository } from 'typeorm';
import { CompaniesService } from '../companies/companies.service';

describe('ProductsService', () => {
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                { provide: PRODUCT_REPOSITORY, useValue: {} as Repository<any> },
                { provide: CompaniesService, useValue: {} } /* Mockando CompaniesService*/,
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
