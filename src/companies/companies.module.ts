import { Module } from '@nestjs/common'
import { CompaniesController } from './controllers/companies.controller'
import { CompaniesService } from './services/companies.service'
import { PrismaModule } from '../prisma/prisma.module'
import { ICompaniesRepository } from './repositories/companies.repository'
import { CompaniesRepository } from './repositories/companies.prisma.repository'

@Module({
  imports: [PrismaModule],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    {
      provide: ICompaniesRepository,
      useClass: CompaniesRepository,
    },
  ],
  exports: [CompaniesService],
})
export class CompaniesModule {}
