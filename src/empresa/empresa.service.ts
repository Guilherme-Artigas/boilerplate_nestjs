import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './empresa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private repo: Repository<Empresa>,
  ) {}

  criar(dados) {
    return this.repo.save(dados);
  }

  listarTodos() {
    return this.repo.find({ relations: ['produtos'] });
  }

  buscarPorId(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['produtos'] });
  }

  atualizar(id: number, dados) {
    return this.repo.update(id, dados);
  }

  remover(id: number) {
    return this.repo.delete(id);
  }
}
