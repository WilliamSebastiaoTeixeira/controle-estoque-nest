import  { Body, Controller, Post, Get, UseGuards }  from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createUser(
    @Body('senha') password: string,
    @Body('email') username: string,
    @Body('nome') nome: string, 
  ) {
    const result = await this.usersService.createUser(username, password, nome)
    return result
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async updateUser(
    @Body('_id') _id: string,
    @Body('senha') password: string,
    @Body('email') username: string,
    @Body('nome') nome: string, 
  ) {
    const result = await this.usersService.updateUser(_id, username, password, nome)
    return result
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  async fakeDelete(
    @Body('_id') _id: string,
  ) {
    const result = await this.usersService.fakeDeleteUserById(_id)
    return result
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async listUsers(){
    const result = await this.usersService.listUsers()
    return result
  }
}
