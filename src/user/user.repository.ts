import { Injectable } from "@nestjs/common/decorators";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
  private users: UserEntity[] = []

  async save(user: UserEntity) {
    this.users.push(user)
    return user
  }

  async listAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async findOne(email: string) {
    return this.users.find((user) => user.email === email)
  }

  async verifyUserByEmail(email: string): Promise<boolean> {
    const user = this.users.find((user) => user.email === email)
    return user !== undefined;
  }

  async update(id: string, userData: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    const user = await this.users.find(user => user.id === id);

    if(!user) {
      return user
    }

    Object.entries(userData).forEach(([key, value]) => {
      if(key === "id") {
        return;
      }

      user[key] = value
    })

    return user
  }

  async delete(id: string) {
    const userExists = this.users.find((user) => user.id === id)

    if(!userExists) {
      return undefined
    }

    this.users = this.users.filter((user) => user.id !== id)

    return userExists
  }
}