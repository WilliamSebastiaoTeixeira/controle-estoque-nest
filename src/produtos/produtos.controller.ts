import  { Body, Controller, Post, Get, UseGuards, Query, Request }  from '@nestjs/common'

import { ProdutosService } from './produtos.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

import { Role } from "../roles/roles.enum"
import { Roles } from "../roles/roles.decorator"
import { RolesGuard } from '../auth/guards/roles.guard'

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService, ) {}
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.APH, Role.LIMPEZA)
  @Post('/create')
  async createProduto(
    @Body('nome') nome: string,
    @Body('descricao') descricao: string,
    @Body('subModulo') subModulo?: string
  ) {
    const result = await this.produtosService.createProduto(nome, descricao, subModulo)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.APH, Role.LIMPEZA)
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
  @Roles(Role.APH, Role.LIMPEZA)
  @Post('/delete')
  async fakeDelete(
    @Body('_id') _id: string,
  ) {
    const result = await this.produtosService.fakeDeleteProdutoById(_id)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.APH, Role.LIMPEZA)
  @Get('/list')
  async listProdutos(
    @Query('subModulo') subModulo?: string,
  ){
    const result = await this.produtosService.listProdutos(subModulo)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.APH, Role.LIMPEZA, Role.ENTRADA_SAIDA)
  @Post('/list-by-param')
  async listWithParam(
    @Body('param') param: string,
    @Request() req,
  ) {
    const result = await this.produtosService.listProdutosByParam(param, req.user.userId)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.APH, Role.LIMPEZA, Role.ENTRADA_SAIDA)
  @Post('/find-by-id')
  async findById(
    @Body('_id') _id: string,
  ) {
    const result = await this.produtosService.findNaoDeletadoByIdFormated(_id)
    return result
  }
}
