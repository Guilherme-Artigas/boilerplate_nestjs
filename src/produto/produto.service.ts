import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './typeorm-produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { Empresa } from '../empresa/empresa.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,

    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}

  async criar(dados: CreateProdutoDto) {
    const empresa = await this.empresaRepository.findOneBy({ id: dados.empresaId });
    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }

    const produto = this.produtoRepository.create({
      nome: dados.nome,
      preco: dados.preco,
      empresa,
    });

    return this.produtoRepository.save(produto);
  }

  async listarTodos() {
    return this.produtoRepository.find({ relations: ['empresa'] });
  }

  async buscarPorId(id: number) {
    return this.produtoRepository.findOne({ where: { id }, relations: ['empresa'] });
  }

  async atualizar(id: number, dados: Partial<CreateProdutoDto>) {
    await this.produtoRepository.update(id, dados);
    return this.buscarPorId(id);
  }

  async remover(id: number) {
    return this.produtoRepository.delete(id);
  }
}
