import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, IsUrl, MaxLength, Min, ValidateNested } from "class-validator";
import { ImageProductDTO, ProductFeatureDTO } from "./CreateProduct.dto";

export class UpdateProductDTO {
  @IsUUID(undefined, {message: "ID do produto inválido"})
  id: string;

  @IsString()
  @IsNotEmpty({message: "Nome do produto não pode ser vazio"})
  @IsOptional()
  name: string;

  @IsNumber({maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false})
  @IsOptional()
  @Min(1, {message: "value precisa ser maior que zero"})
  @IsOptional()
  value: number;

  @IsNumber()
  @Min(0, {message: "quantidade disponível mínima é zero"})
  @IsOptional()
  quantityAvailable: number;

  @IsString()
  @IsOptional()
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductFeatureDTO)
  @IsOptional()
  features: ProductFeatureDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImageProductDTO)
  @IsOptional()
  images: ImageProductDTO[];

  @IsString()
  @IsNotEmpty({message: "Category do produto não pode ser vazia"})
  @IsOptional()
  category: string;
}