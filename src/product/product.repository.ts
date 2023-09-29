import { Injectable } from "@nestjs/common"
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  listAll() {
    return this.products;
  }

  save(productData: ProductEntity) {
    this.products.push(productData);
    return productData;
  }

  private searchForId(id: string) {
    const existedProduct = this.products.find(product => product.id === id);

    if(!existedProduct) {
      return undefined;
    }

    return existedProduct;
  }

  async update(id: string, productData: Partial<ProductEntity>) {
    const non_updateble_data = ["id"];
    const product = this.searchForId(id);

    Object.entries(productData).forEach(([key, value]) => {
      if(non_updateble_data.includes(key)) {
        return;
      }

      product[key] = value;
    })

    return product;
  }

  async delete(id: string) {
    const deletedProduct = this.searchForId(id);
    this.products = this.products.filter(product => product.id !== id);
    return deletedProduct;
  }
}