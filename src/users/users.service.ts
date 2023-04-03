import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { User } from './users.model'
import { Role } from './../roles/roles.enum'
@Injectable()
export class UsersService {

  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async createUser(userName: string, password: string, nome: string, permissoes: string[]) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)

    const userExists = await this.userModel.findOne({ username: userName.toLocaleLowerCase(), deleted: false })
    if(userExists){
      throw new UnauthorizedException('Já existe um usuário com este email!')
    }

    const newUser = new this.userModel({
      username: userName.toLowerCase(),
      password: hashedPassword,
      nome: nome,
      deleted: false,
      permissoes: permissoes,
    })
    await newUser.save()
    return {
      message: 'Usuario criado com sucesso!'
    };
  }

  async updateMyUser(_id: string, userName: string, password: string, nome: string) {
    let newPassword = {}
    
    if(password){
      const saltOrRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltOrRounds)
      newPassword = {
        password: hashedPassword
      }
    }

    const userExists = await this.userModel.findOne({ username: userName.toLocaleLowerCase(), deleted: false })
    if(userExists && userExists._id.toString() !== _id){
      throw new UnauthorizedException('Já existe um usuário com este email!')
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(_id, {
      username: userName, 
      nome: nome,
      ...newPassword
    })

    return {
      message: 'Usuario atualizado com sucesso!'
    };
  }

  async updateMyUserPermission(_id: string, permissoes: string[]) {
    const updatedUser = await this.userModel.findByIdAndUpdate(_id, {
      permissoes: permissoes, 
    })

    return {
      message: 'Usuario atualizado com sucesso!'
    };
  }

  async updateUser(_id: string, userName: string, password: string, nome: string, permissoes: string[]) {
    
    let newPassword = {}
    
    if(password){
      const saltOrRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltOrRounds)
      newPassword = {
        password: hashedPassword
      }
    }

    const userExists = await this.userModel.findOne({ username: userName.toLocaleLowerCase(), deleted: false })
    if(userExists && userExists._id.toString() !== _id){
      throw new UnauthorizedException('Já existe um usuário com este email!')
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(_id, {
      username: userName, 
      nome: nome,
      permissoes: permissoes,
      ...newPassword
    })

    return {
      message: 'Usuario atualizado com sucesso!'
    };
  }

  async findUserByUsername(userName: string){
    const username = userName.toLowerCase()
    const user = await this.userModel.findOne({ username, deleted: false })
    if(!user){
      throw new UnauthorizedException('Não foi possível encontrar este endereço de email!')
    }
    return user
  }  

  async findUserByIdAndPermissions(_id: string, permissoes: string[]){
    const user = await this.userModel.findById(_id)
    if(!user){
      return false
    }

    return permissoes.find((permissao: string) => {
      return user.permissoes.includes(permissao)
    })
  }

  async listUsers(_id: string){
    const users = await this.userModel.find({})
    
    const usersMapped = users.map((user: User) => {
      if(!user.deleted) return {
        _id: user._id,
        nome: user.nome,
        email: user.username, 
        permissoes: user.permissoes
      }
    }).filter((u) => u !== undefined && u._id.toString() !== _id)
    return usersMapped
  }

  async listRoles(){
    return Object.values(Role)
  }

  async fakeDeleteUserById(_id: string){
    await this.userModel.findByIdAndUpdate(_id , {deleted: true})
    return {
      message: 'Usuario deletado com sucesso!'
    }
  }
}