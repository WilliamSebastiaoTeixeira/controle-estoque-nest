import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { ProdutoSchema } from './produtos.model';

import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature(
      [
        { 
          name: "produto", 
          schema: ProdutoSchema 
        }
      ]
    ),
  ],
  providers: [ProdutosService],
  exports: [ProdutosService],
  controllers: [ProdutosController],
})
export class ProdutosModule {}