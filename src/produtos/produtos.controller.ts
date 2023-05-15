import  { Body, Controller, Post, Get, UseGuards }  from '@nestjs/common'

import { ProdutosService } from './produtos.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

import { Role } from "../roles/roles.enum"
import { Roles } from "../roles/roles.decorator"
import { RolesGuard } from '../auth/guards/roles.guard'

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService, ) {}
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PRODUTOS)
  @Post('/create')
  async createProduto(
    @Body('nome') nome: string,
    @Body('descricao') descricao: string,
  ) {
    const result = await this.produtosService.createProduto(nome, descricao)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PRODUTOS)
  @Post('/update')
  async updateProduto(
    @Body('_id') _id: string,
    @Body('nome') nome: string,
    @Body('descricao') descricao: string,
  ) {
    const result = await this.produtosService.updateProduto(_id, nome, descricao)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PRODUTOS)
  @Post('/delete')
  async fakeDelete(
    @Body('_id') _id: string,
  ) {
    const result = await this.produtosService.fakeDeleteProdutoById(_id)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PRODUTOS)
  @Get('/list')
  async listProdutos(){
    const result = await this.produtosService.listProdutos()
    return result
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PRODUTOS, Role.ENTRADA_SAIDA)
  @Post('/list-by-param')
  async listWithParam(
    @Body('param') param: string,
  ) {
    const result = await this.produtosService.listProdutosByParam(param)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PRODUTOS, Role.ENTRADA_SAIDA)
  @Post('/find-by-id')
  async findById(
    @Body('_id') _id: string,
  ) {
    const result = await this.produtosService.findNaoDeletadoByIdFormated(_id)
    return result
  }
}
