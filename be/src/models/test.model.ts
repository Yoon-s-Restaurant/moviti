import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Test extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column()
  name!: string;
}
