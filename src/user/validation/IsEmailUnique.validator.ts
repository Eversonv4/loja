import { ValidatorConstraintInterface, ValidationArguments, ValidatorConstraint, ValidationOptions, registerDecorator } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async: true})
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {

  constructor(
    private userRepository: UserRepository
  ) {}
  
  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const userExists = await this.userRepository.verifyUserByEmail(value)
    return !userExists;
  }
}

export const IsEmailUnique = (optionsValidation: ValidationOptions) => {
  return (object: Object, property: string) => {
    // "property" é a propriedade do DTO onde será usada essa validação, no nosso caso "email"
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: optionsValidation,
      constraints: [],
      validator: IsEmailUniqueValidator
    })
  }
}