import  { Body, Controller, Post, Get, UseGuards, Request, Query }  from '@nestjs/common'

import { RegistroService } from './registro.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

import { Role } from "../roles/roles.enum"
import { Roles } from "../roles/roles.decorator"
import { RolesGuard } from '../auth/guards/roles.guard'

import { ProdutoUnidades } from './registro.model'

@Controller('registro')
export class RegistroController {
  constructor(private readonly registroService: RegistroService, ) {}
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ENTRADA_SAIDA)
  @Post('/registrar-entrada')
  async registrarEntrada(
    @Request() req,
    @Body('produtos') produtos: ProdutoUnidades[],
  ) {
    const result = await this.registroService.registrarEntrada(produtos, req.user.userId)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ENTRADA_SAIDA)
  @Post('/registrar-saida')
  async registrarSaida(
    @Request() req,
    @Body('produtos') produtos: {produto: string, unidades: string[]}[],
  ) {
    const result = await this.registroService.registrarSaida(produtos, req.user.userId)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ENTRADA_SAIDA)
  @Get('/list')
  async list(
    @Query('skip') skip?: number,
    @Query('limit') limit?: number,
    @Query('termo') termo?: string,
  ){
    const result = await this.registroService.list(skip, limit, termo)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ENTRADA_SAIDA)
  @Post('/list-produto-unidades')
  async listUnidadesByProduto(
    @Body('produtoId') produtoId: string,
  ){  
    const result = await this.registroService.listUnidadesByProduto(produtoId)
    return result
  }
}
