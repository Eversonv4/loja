import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { IsEmailUniqueValidator } from "./validation/IsEmailUnique.validator";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserRepository, IsEmailUniqueValidator, UserService],
  exports: [TypeOrmModule]
})
export class UserModule {}