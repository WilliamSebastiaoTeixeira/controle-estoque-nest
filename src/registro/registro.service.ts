import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Registro, ProdutoUnidades, Unidade } from './registro.model'
import { UnidadeService } from 'src/unidade/unidade.service'
import { ProdutosService } from 'src/produtos/produtos.service'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class RegistroService {

  constructor(
    @InjectModel('registro') 
    private readonly registroModel: Model<Registro>,
    private readonly unidadeService: UnidadeService,
    private readonly produtosService: ProdutosService,
    private readonly usersService: UsersService,
  ) {}

  async registrarEntrada(produtos: ProdutoUnidades[], usuario: string){

    const configProdutos = produtos.map(async (produto: ProdutoUnidades) => {  

      const unidades = produto.unidades.map((unidade: Unidade) => {
        return {
          produtoId: produto.produto,
          descricao: unidade.descricao,
          dataInserido: new Date(),
          dataRemovido: null,
          dataValidade: unidade.dataValidade ? new Date(unidade.dataValidade) : null
        }
      })
      const newUnidades = await this.unidadeService.criarUnidades(unidades)

      await this.produtosService.addUnidades(produto.produto, newUnidades.length)

      const newUnidadesIds = newUnidades.map((newUnidade) => {
        return newUnidade._id
      })

      return {
        produto: produto.produto,
        unidades: newUnidadesIds
      }
    })

    const produtosPromises = await Promise.all(configProdutos)
  
    const newEntrada = new this.registroModel({
      usuario: usuario,
      produtos: produtosPromises,
      entrada: true, 
      dataEntrada: new Date(),
      deleted: false,
    })

    await newEntrada.save()    
    
    return {
      message: 'Entrada registrada com sucesso!'
    }; 
  }

  async registrarSaida(produtos: {produto: string, unidades: string[]}[], usuario: string){

    produtos.forEach(async (produto) => {
      await this.produtosService.removeUnidades(produto.produto, produto.unidades.length)
      produto.unidades.forEach(async (unidade) => {
        await this.unidadeService.findByIdAndUpdateDataRemovido(unidade, new Date())
      })
    })
    
    const newEntrada = new this.registroModel({
      usuario: usuario,
      produtos: produtos,
      entrada: false, 
      dataSaida: new Date(),
      deleted: false,
    })

    await newEntrada.save()   

    return {
      message: 'Retirada registrada com sucesso!'
    }
  }

  async list(skip?: number, limit?: number, termo?: string){
    let registros = []
    let pageTotal = 0

    if(skip && limit) {
      const count = await this.registroModel
        .countDocuments({})
        .exec()

      pageTotal = Math.floor((count - 1) / limit) + 1

      registros =  await this.registroModel
        .find()
        .sort({createdAt: -1})
        .limit(limit)
        .skip(skip)
        .exec()
    }
    else {
      registros = await this.registroModel
        .find({})
        .sort({createdAt: -1})
    }

    const registrosMapped = registros
      .filter((registro: Registro) => !registro.deleted)
      .map(async (registro: Registro) => {

      const produtosMapped = registro.produtos.map(async (produto) => {
        const produtoDB = await this.produtosService.findById(produto.produto)

        const unidadesDB = (await this.unidadeService.findByManyId(produto.unidades)).map((unidade) => {
          return {
            dataValidade: unidade.dataValidade,
            descricao: unidade.descricao,
          }
        })

        return {
          nome: produtoDB.nome,
          unidades: unidadesDB
        }
      })

      const produtosPromises = await Promise.all(produtosMapped)

      const usuario = await this.usersService.findUserById(registro.usuario)

      return {
        _id: registro._id, 
        dataEntrada: registro.dataEntrada,
        dataSaida: registro.dataSaida, 
        entrada: registro.entrada,
        produtos: produtosPromises,
        usuario: {
          nome: usuario.nome,
          email: usuario.username
        } 
      }
    })

    const registroPromises = await Promise.all(registrosMapped)

    if(pageTotal) return { pageTotal: pageTotal, list: registroPromises }

    return {
      list: registroPromises,
    }
  } 


  async listUnidadesByProduto(produtoId: string){
    return await this.unidadeService.listUnidadesByProduto(produtoId)
  }
}