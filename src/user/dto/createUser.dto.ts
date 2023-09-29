import { IsString, IsEmail, MinLength, IsNotEmpty, IsArray } from "class-validator"
import { IsEmailUnique } from "../validation/IsEmailUnique.validator"

export class CreateUserDTO {

  @IsString()
  @IsNotEmpty({message: "Nome nao pode ser vazio"})
  name: string

  @IsEmail(undefined, { message: "O email informado é inválido"})
  @IsEmailUnique({message: "Email já cadastrado!"})
  email: string

  @MinLength(6, { message: "A senha precisa ter pelo menos 6 caracteres"})
  password: string

  // @IsArray()
  // languages: string[]
}