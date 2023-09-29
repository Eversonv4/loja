import { Body, Controller, Get, Param, Post, Put, Res, Delete } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { Response } from "express";
import { CreateUserDTO } from "./dto/createUser.dto";
import { v4 as uuid } from "uuid"
import { ListUsersDTO } from "./dto/listUser.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController {

  constructor(
    private userRepository: UserRepository,
    private userService: UserService
  ) {}

  @Get()
  async index(@Res() res: Response) {
    const users = await this.userService.listAll()
    console.log(users);
    return res.status(200).send({...users})
  }

  @Post()
  async create(@Body() userData: CreateUserDTO , @Res() res: Response) {
    const user = {
      id: uuid(),
      ...userData,
      createdAt: new Date(),
      deletedAt: new Date(),
      updatedAt: new Date()
    }

    // const {id, name, email } = await this.userService.create(user);
    const userCreated = await this.userService.create(user);
    return res.status(201).send({...userCreated})
  }

  @Put("/:id")
  async updateUser(@Param("id") id: string, @Body() userData: UpdateUserDTO, @Res() res: Response) {
    const updatedUser = await this.userService.update(id, userData)

    if (!updatedUser) {
      return res.status(404).send({message: "Usuário não existe!"})
    }

    return res.send({updatedUser})
  }

  @Delete("/:id")
  async deleteUser(@Param("id") id: string, @Res() res: Response) {
    const deletedUser = await this.userService.delete(id)

    if(deletedUser?.affected === 0) {
      return res.status(400).send({message: "usuário não existe"})
    }

    return res.status(200).send({message: "usuário excluído com sucesso"})
  }
}