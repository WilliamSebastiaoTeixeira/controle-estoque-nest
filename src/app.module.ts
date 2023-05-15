import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { mongoose } from './environment/constants'; 

import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProdutosModule } from './produtos/produtos.module';
import { RegistroModule } from './registro/registro.module';
import { UnidadeModule } from './unidade/unidade.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    ProdutosModule,
    RegistroModule,
    UnidadeModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }), 
    MongooseModule.forRoot(mongoose.uri, {
      dbName: mongoose.dbName
    })
  ],
  controllers: [AppController],
})
export class AppModule {}
