import { IsNotEmpty, IsString, IsEmail, MinLength, IsArray, IsOptional } from "class-validator";
import { IsEmailUnique } from "../validation/IsEmailUnique.validator";

export class UpdateUserDTO {

  @IsString()
  @IsNotEmpty({message: "Nome não pode ser vazio"})
  @IsOptional()
  name: string

  @IsEmail(undefined, {message: "O email é inválido"})
  @IsEmailUnique({message: "Email já cadastrado"})
  @IsOptional()
  email: string

  @MinLength(6, {message: "A senha precisa ter pelo menos 6 caracteres"})
  @IsOptional()
  password: string

  // @IsArray({message: "languages precisa ser um array de strings"})
  // @IsOptional()
  // languages: string[]
}