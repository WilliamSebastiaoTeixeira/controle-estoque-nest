import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username)
    const senhaValida = await bcrypt.compare(password, user.password)

    if (user && senhaValida) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
    };
    return {
      usuario: {
        _id: user._doc._id,
        email: user._doc.username,
        nome: user._doc.nome,
      },
      token: this.jwtService.sign(payload),
    };
  }
}