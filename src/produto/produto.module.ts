import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './typeorm-produto.entity';
import { Empresa } from '../empresa/empresa.entity';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Empresa])],
  providers: [ProdutoService],
  controllers: [ProdutoController],
})
export class ProdutoModule {}
