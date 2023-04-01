import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from "./users.model"

@Module({
  imports: [MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}