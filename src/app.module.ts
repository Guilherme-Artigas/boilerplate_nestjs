import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './empresa/empresa.entity';
import { Produto } from './produto/typeorm-produto.entity';
import { ProdutoModule } from './produto/produto.module';
import { EmpresaModule } from './empresa/empresa.module';

console.log('DATABASE_URL:', process.env.DATABASE_URL); 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Empresa, Produto],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    ProdutoModule,
    EmpresaModule,
  ],
})
export class AppModule {}
