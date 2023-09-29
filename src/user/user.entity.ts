import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "users"})
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({name: "name", length: 100, nullable: false})
  name: string;

  @Column({name: "email", length: 50, nullable: false})
  email: string;

  @Column({name: "password", length: 255, nullable: false})
  password: string;

  // @Column({name: "languages", length: 255, nullable: false})
  // languages: string[];

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;

  @DeleteDateColumn({name: "deleted_at"})
  deletedAt: Date;
}