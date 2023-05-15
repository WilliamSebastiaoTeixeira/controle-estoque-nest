import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Unidade, UnidadeObject } from './unidade.model'

@Injectable()
export class UnidadeService {

  constructor(@InjectModel('unidade') private readonly unidadeModel: Model<Unidade>) {}

  async criarUnidade(unidade: UnidadeObject){
    const newUnidade = new this.unidadeModel(unidade)
    await newUnidade.save()
    return newUnidade
  }

  async criarUnidades(unidades: UnidadeObject[]){
    const newUnidades = await this.unidadeModel.insertMany(unidades)
    return newUnidades
  }

  async listUnidadesByProduto(produtoId: string){
    const data = await this.unidadeModel.find({ produtoId: produtoId, dataRemovido: null})
    return data
  }

  async findByManyId(unidadeIds: string[]){
    const unidades = await this.unidadeModel.find({ '_id': { $in: unidadeIds } })
    return unidades
  }

  async findByIdAndUpdateDataRemovido(_id: string, dataRemovido: Date){
    const unidade = await this.unidadeModel.findByIdAndUpdate(_id, {dataRemovido: dataRemovido})
    return unidade
  }
}