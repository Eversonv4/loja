import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, IsUrl, MaxLength, Min, ValidateNested } from "class-validator";
import { ProductEntity } from "../product.entity";

export class ProductFeatureDTO {
  id: string

  @IsString()
  @IsNotEmpty({message: "nome dos recursos não pode ser vazio"})
  name: string;

  @IsString()
  @IsNotEmpty({message: "indo description não pode ser vazia"})
  description: string;

  product: ProductEntity;
}

export class ImageProductDTO {
  id: string

  @IsUrl(undefined, {message: "URL para imagem inválida"})
  url: string;

  @IsString()
  @IsNotEmpty({message: "descrição da imagem não pode ser vazia"})
  description: string;

  product: ProductEntity;
}

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty({message: "name não pode ser vazio"})
  name: string;

  @IsNumber({maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false})
  @Min(1, {message: "value precisa ser maior que zero"})
  value: number;

  @IsNumber()
  @Min(0, {message: "Quantidade disponível mínima é zero"})
  quantityAvailable: number;

  @IsString()
  @IsNotEmpty({message: "Descrição não pode ser vazia"})
  @MaxLength(1000, {message: "Descrição pode ter até 1000 caracteres"})
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductFeatureDTO)
  details: ProductFeatureDTO[]

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImageProductDTO)
  images: ImageProductDTO[];

  @IsString()
  @IsNotEmpty({message: "Category não pode ser vazia"})
  category: string
}