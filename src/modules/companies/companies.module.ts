import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { COMPANY_REPOSITORY, DATA_SOURCE } from '@common/constants/repository.tokens';
import { DatabaseModule } from '../database/database.module';
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { Company } from './entities/company.entity';

const companyProviders = [
    {
        provide: COMPANY_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Company),
        inject: [DATA_SOURCE],
    },
];

@Module({
    imports: [DatabaseModule],
    controllers: [CompaniesController],
    providers: [CompaniesService, ...companyProviders],
    exports: [CompaniesService],
})
export class CompaniesModule {}
