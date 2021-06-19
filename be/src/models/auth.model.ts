import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "idx" })
  idx!: number;

  @Column({ name: "name" })
  name!: string;

  @Column({ name: "email" })
  email!: string;

  @Column({ name: "password" })
  password!: string;

  @Column({ name: "type" })
  type!: string;
}
