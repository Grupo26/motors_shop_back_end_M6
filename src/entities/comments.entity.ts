import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./user.entity";
import { Vehicle } from "./vehicle.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 300 })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.comments, {eager: true})
  users: User

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.comments)
  vehicles: Vehicle
}