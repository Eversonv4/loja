import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { ListUsersDTO } from "./dto/listUser.dto"
import { UserEntity } from "./user.entity"
import { Repository } from "typeorm"
import { UpdateUserDTO } from "./dto/updateUser.dto"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async listAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async create(userEntity: UserEntity) {
    const user = this.userRepository.create(userEntity)
    return await this.userRepository.save(user)
  }

  async update(id: string, userEntity: UpdateUserDTO) {
    return await this.userRepository.update(id, userEntity)
  }

  async delete(id: string) {
    return await this.userRepository.delete(id)
  }
}