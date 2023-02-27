import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Vehicle } from "./vehicle.entity"

@Entity("image_galeries")
export class ImageGalery {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ length: 300 })
  url_image: string

  @ManyToOne(() => Vehicle, (vehicles) => vehicles.image_galeries)
  vehicles: Vehicle
}