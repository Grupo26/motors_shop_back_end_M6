import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./comments.entity";
import { ImageGalery } from "./imageGalery.entity";
import { User } from "./user.entity";

enum TypeVehicle {
  MOTORCYCLE = "motorcycle",
  CAR = "car",
}

@Entity("vehicles")
export class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "enum", enum: TypeVehicle })
  type: TypeVehicle;

  @Column({ length: 250 })
  imgCap: string;

  @Column({ length: 60 })
  title: string;

  @Column({ length: 300 })
  description: string;

  @Column({ type: "decimal" })
  km: number;

  @Column()
  year: number;

  @Column({ type: "decimal" })
  value: number;

  @ManyToOne(() => User, (user) => user.vehicles)
  users: User;

  @OneToMany(() => ImageGalery, (image_galeries) => image_galeries.vehicles)
  imageGaleries: ImageGalery[];

  @OneToMany(() => Comment, (comment) => comment.vehicles)
  comments: Comment[];
}
