import { Controller, Post, Body, Res, Get, Put, Param, Delete } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { CreateProductDTO } from "./dto/CreateProduct.dto";
import { Response } from "express";
import { v4 as uuid } from "uuid"
import { UpdateProductDTO } from "./dto/UpdateProduct.dto";
import { ProductService } from "./product.service";
import { ProductEntity } from "./product.entity";

@Controller("product")
export class ProductController {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productService: ProductService
  ) {}

  @Post()
  async create(@Body() productData: CreateProductDTO, @Res() res: Response) {
    const product = new ProductEntity();

    product.id = uuid();
    product.name = productData.name;
    product.value = productData.value;
    product.quantityAvailable = productData.quantityAvailable;
    product.description = productData.description;
    product.category = productData.category;
    product.details = productData.details;
    product.images = productData.images;
    product.createdAt = new Date()
    product.deletedAt = new Date()
    product.updatedAt = new Date()
    

    const registeredProduct = this.productService.save(product)

    return res.status(200).send({...registeredProduct})
  }

  @Get()
  async listAll() {
    return await this.productRepository.listAll()
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() dataProduct: UpdateProductDTO) {
    const updatedProduct = await this.productRepository.update(id, dataProduct);

    return updatedProduct
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const deletedProduct = await this.productRepository.delete(id);

    return deletedProduct;
  }
}