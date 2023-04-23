import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { UsersService } from '../../users/users.service'

import { Role } from '../../roles/roles.enum'
import { ROLES_KEY } from '../../roles/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()
  
    const userHavePermissao = await this.usersService.findUserByIdAndPermissions(user.userId, requiredRoles)

    if(!userHavePermissao) {
      throw new UnauthorizedException('Usuário não tem permissão!')
    }

    return true
  }
}