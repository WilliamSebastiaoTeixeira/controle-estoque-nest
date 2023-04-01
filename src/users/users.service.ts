import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; 
import * as bcrypt from 'bcrypt';

import { User } from './users.model'; 
@Injectable()
export class UsersService {

  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async createUser(userName: string, password: string, nome: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = new this.userModel({
      username: userName.toLowerCase(),
      password: hashedPassword,
      nome: nome,
      deleted: false
    });
    await newUser.save();
    return {
      message: 'Usuario criado com sucesso!'
    };
  }

  async updateUser(_id: string, userName: string, password: string, nome: string) {
    
    let newPassword = {}
    
    if(password){
      const saltOrRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltOrRounds)
      newPassword = {
        password: hashedPassword
      }
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


  async findUserByUsername(userName: string){
    const username = userName.toLowerCase();
    const user = await this.userModel.findOne({ username });
    return user;
  }  

  async listUsers(){
    const users = await this.userModel.find({});
    
    const usersMapped = users.map((user: User) => {
      if(!user.deleted) return {
        _id: user._id,
        nome: user.nome,
        email: user.username, 
      }
    }).filter((u) => u !== undefined)

    return usersMapped
  }

  async fakeDeleteUserById(_id: string){
    await this.userModel.findByIdAndUpdate(_id , {deleted: true})
    return {
      message: 'Usuario deletado com sucesso!'
    }
  }
}