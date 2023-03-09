import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./photos.entity";
import { Vehicle } from "./vehicle.entity";

@Entity("image_galeries")
export class ImageGalery {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @OneToMany(() => Photo, (photo) => photo.imageGalery, {
        eager: true,
        onDelete: "CASCADE",
    })
    photos: Photo[];
}

