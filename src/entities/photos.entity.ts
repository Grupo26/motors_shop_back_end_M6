import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ImageGalery } from "./imageGalery.entity";

@Entity("photos")
export class Photo {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({ length: 300 })
    urlImage: string;

    @Column()
    public_id: string;

    @ManyToOne(() => ImageGalery, (imageGalery) => imageGalery.photos)
    imageGalery: ImageGalery;
}

