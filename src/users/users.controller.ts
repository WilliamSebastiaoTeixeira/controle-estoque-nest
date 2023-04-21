import  { Body, Controller, Post, Get, UseGuards, Request }  from '@nestjs/common'

import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

import { Role } from "../roles/roles.enum"
import { Roles } from "../roles/roles.decorator"
import { RolesGuard } from '../auth/guards/roles.guard'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMINISTRAR)
  @Post('/create')
  async createUser(
    @Body('senha') password: string,
    @Body('email') username: string,
    @Body('nome') nome: string,
    @Body('permissoes') permissoes: string[],
  ) {
    const result = await this.usersService.createUser(username, password, nome, permissoes)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMINISTRAR)
  @Post('/update')
  async updateUser(
    @Body('_id') _id: string,
    @Body('senha') password: string,
    @Body('email') username: string,
    @Body('nome') nome: string,
    @Body('permissoes') permissoes: string[], 
  ) {
    const result = await this.usersService.updateUser(_id, username, password, nome, permissoes)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MEU_PERFIL, Role.ADMINISTRAR)
  @Get('/get-meu-perfil')
  async getMyUser(
    @Request() req,
  ) {
    const result = await this.usersService.getMyUser(req.user.userId)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MEU_PERFIL)
  @Post('/update-meu-perfil')
  async updateMyUser(
    @Request() req,
    @Body('senha') password: string,
    @Body('email') username: string,
    @Body('nome') nome: string,
  ) {
    const result = await this.usersService.updateMyUser(req.user.userId, username, password, nome)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMINISTRAR)
  @Post('/update-meu-perfil-permissoes')
  async updateMyUserPermission(
    @Request() req,
    @Body('permissoes') permissoes: string[],
  ) {
    const result = await this.usersService.updateMyUserPermission(req.user.userId, permissoes)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMINISTRAR)
  @Post('/delete')
  async fakeDelete(
    @Body('_id') _id: string,
  ) {
    const result = await this.usersService.fakeDeleteUserById(_id)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMINISTRAR)
  @Get('list')
  async listUsers(@Request() req){
    const result = await this.usersService.listUsers(req.user.userId)
    return result
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMINISTRAR)
  @Get('permissoes')
  async listRoles(){
    const result = await this.usersService.listRoles()
    return result
  }
}
