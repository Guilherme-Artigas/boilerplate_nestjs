import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { COMPANY_REPOSITORY } from '@common/constants/repository.tokens';
import { Repository } from 'typeorm';

describe('CompaniesService', () => {
    let service: CompaniesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CompaniesService, { provide: COMPANY_REPOSITORY, useValue: {} as Repository<any> }],
        }).compile();

        service = module.get<CompaniesService>(CompaniesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
