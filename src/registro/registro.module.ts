import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';
import { RegistroSchema } from './registro.model';

import { UsersModule } from 'src/users/users.module';
import { UnidadeModule } from 'src/unidade/unidade.module';
import { ProdutosModule } from 'src/produtos/produtos.module';

@Module({
  imports: [
    UsersModule,
    UnidadeModule,
    ProdutosModule,
    MongooseModule.forFeature(
      [
        { 
          name: "registro", 
          schema: RegistroSchema 
        }
      ]
    ),
  ],
  providers: [RegistroService],
  exports: [RegistroService],
  controllers: [RegistroController],
})
export class RegistroModule {}