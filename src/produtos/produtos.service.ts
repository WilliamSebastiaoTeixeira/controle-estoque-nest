import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Produto } from './produtos.model'
@Injectable()
export class ProdutosService {

  constructor(
    @InjectModel('produto') private readonly produtoModel: Model<Produto>,
  ) {}

  async createProduto(nome: string, descricao: string) {
    const newProduto = new this.produtoModel({
      nome: nome,
      descricao: descricao,
      deleted: false,
    })
    await newProduto.save()
    return {
      message: 'Produto criado com sucesso!'
    };
  }

  async updateProduto(_id: string, nome: string, descricao: string) {
    const updatedProduto = await this.produtoModel.findByIdAndUpdate(_id, {
      nome: nome,
      descricao: descricao,
    })

    return {
      message: 'Produto atualizado com sucesso!'
    };
  }

  async findManyById(produtoIds: string[]){
    const produtos = await this.produtoModel.find({ '_id': { $in: produtoIds } })
    return produtos
  }

  async findById(_id: string){
    return await this.produtoModel.findById(_id)
  }

  async findNaoDeletadoById(_id: string){
    const produto = await this.produtoModel.findOne({ _id: _id, deleted: false })
    if(!produto){
      throw new UnauthorizedException('Não foi possível encontrar este produto!')
    }
    return produto
  }
  
  async findNaoDeletadoByIdFormated(_id: string){
    const produto = await this.findById(_id)
    if(produto.deleted){
      throw new UnauthorizedException('Este produto não exite no banco de dados, procure o código correto!')
    }
    return {
      _id: produto._id,
      nome: produto.nome,
      qtdUnidades: produto.qtdUnidades,
      descricao: produto.descricao, 
    }
  }

  async listProdutos(){
    const produtos = await this.produtoModel.find({}).sort({createdAt: -1})
    const produtosMapped = produtos.map((produto: Produto) => {
      if(!produto.deleted) return {
        _id: produto._id,
        nome: produto.nome,
        qtdUnidades: produto.qtdUnidades,
        descricao: produto.descricao, 
      }
    }).filter((p) => p !== undefined)
    return produtosMapped
  }

  async listProdutosByParam(param: string){
    if(!param) return []

    const regex = new RegExp(param, 'i')

    const or = {
      $or:[ 
        {nome: {$regex: regex}},
        {descricao: {$regex: regex}}
      ]
    }

    const produtos = await this.produtoModel.find(or).sort({createdAt: -1})

    const produtosMapped = produtos.map((produto: Produto) => {
      if(!produto.deleted) return {
        _id: produto._id,
        nome: produto.nome,
        qtdUnidades: produto.qtdUnidades,
        descricao: produto.descricao, 
      }
    }).filter((p) => p !== undefined)
    return produtosMapped
  }

  async fakeDeleteProdutoById(_id: string){
    await this.produtoModel.findByIdAndUpdate(_id , {deleted: true})
    return {
      message: 'Produto deletado com sucesso!'
    }
  }

  async addUnidades(produtoId: string, qtdUnidades: number){
    const produto = await this.findById(produtoId)
    const newUnidades = produto.qtdUnidades + qtdUnidades
    await this.produtoModel.findOneAndUpdate({_id: produtoId}, {qtdUnidades: newUnidades})
  }

  async removeUnidades(produtoId: string, qtdUnidades: number){
    const produto = await this.findById(produtoId)
    const newUnidades = produto.qtdUnidades - qtdUnidades
    await this.produtoModel.findOneAndUpdate({_id: produtoId}, {qtdUnidades: newUnidades})
  }
}