import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"
import { UnidadeService } from './unidade.service';
import { UnidadeSchema } from './unidade.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { 
          name: "unidade", 
          schema: UnidadeSchema 
        }
      ]
    ),
  ],
  providers: [UnidadeService],
  exports: [UnidadeService],
})
export class UnidadeModule {}