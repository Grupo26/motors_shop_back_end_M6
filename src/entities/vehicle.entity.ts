import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Comment } from "./comments.entity";
import { ImageGalery } from "./imageGalery.entity";
import { User } from "./user.entity";

@Entity("vehicles")
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  readonly id: number;

  @Column()
  typeVehicle: string;

  @Column({ length: 250 })
  imageCap: string;

  @Column({ length: 60 })
  title: string;

  @Column({ length: 300 })
  description: string;

  @Column({ type: "decimal" })
  km: number;

  @Column({ type: "decimal" })
  year: number;

  @Column({ type: "decimal" })
  value: number;

  @ManyToOne(() => User, (user) => user.vehicles)
  users: User

  @OneToMany(() => ImageGalery, (image_galeries) => image_galeries.vehicles)
  image_galeries: ImageGalery[]

  @OneToMany(() => Comment, (comment) => comment.vehicles)
  comments: Comment[];
}