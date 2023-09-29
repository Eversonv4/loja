import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { ProductFeatureEntity } from "./product-feature.entity";
import { ProductImageEntity } from "./product-image.entity";

@Entity({name: "products"})
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({name: "name", length: 100, nullable: false})
  name: string;

  @Column({name: "value", nullable: false})
  value: number;

  @Column({name: "quantity_available", nullable: false})
  quantityAvailable: number;

  @Column({name: "description", length: 255, nullable: false})
  description: string;

  @Column({name: "category", length: 100, nullable: false})
  category: string;

  @OneToMany(() => ProductFeatureEntity, (productFeatureEntity) => productFeatureEntity.product, {cascade: true, eager: true})
  details: ProductFeatureEntity[];

  @OneToMany(() => ProductImageEntity, productImageEntity => productImageEntity.product, {cascade: true, eager: true})
  images: ProductImageEntity[];

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;

  @DeleteDateColumn({name: "deleted_at"})
  deletedAt: Date;
}