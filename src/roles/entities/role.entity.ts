import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:"roles"})
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length:50, unique: true})
  description: string;
}
