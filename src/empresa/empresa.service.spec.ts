import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaService } from './empresa.service';

describe('EmpresaService', () => {
  let service: EmpresaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpresaService],
    }).compile();

    service = module.get<EmpresaService>(EmpresaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
