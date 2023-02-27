import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, } from "typeorm";
import { Comment } from "./comments.entity";
import { Vehicle } from "./vehicle.entity";

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
  @Exclude()
  password: string;

  @Column({ length: 250 })
  description: string

  @Column({ default: true })
  isActive: boolean;

  @Column()
  typeUser: string;

  @Column()

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.users)
  vehicles: Vehicle[];

  @OneToMany(() => Comment, (comment) => comment.users)
  comments: Comment[];

}