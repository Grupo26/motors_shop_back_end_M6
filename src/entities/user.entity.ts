import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, } from "typeorm";
import { Comment } from "./comments.entity";
import { Vehicle } from "./vehicle.entity";

enum TypeUser {
  SELLER = 'seller',
  BUYER = 'buyer',
}

@Entity('users')

export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 15, unique: true })
  cpf: string;

  @Column({ length: 15 })
  phone: string;

  @Column()
  birthDate: Date

  @Column({ length: 250, nullable: true })
  description: string

  @Column({ length: 150 })
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: TypeUser })
  typeUser: TypeUser;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.users)
  vehicles: Vehicle[];

  @OneToMany(() => Comment, (comment) => comment.users)
  comments: Comment[];

}