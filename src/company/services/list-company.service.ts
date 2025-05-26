import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../models/company.entity';
import { ListCompanyDto } from '../dto/list-company.dto';

@Injectable()
export class ListCompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async execute(query: ListCompanyDto): Promise<{ data: Company[]; total: number }> {
    const { page = 1, limit = 10, isAvailable = true } = query;

    const [data, total] = await this.companyRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['products'],
      where: {
        isAvailable,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data,
      total,
    };
  }
}
