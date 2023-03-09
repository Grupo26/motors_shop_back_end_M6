import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./comments.entity";
import { ImageGalery } from "./imageGalery.entity";
import { User } from "./user.entity";

@Entity("vehicles")
export class Vehicle {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    type: string;

    @Column({ nullable: true })
    adType: string;

    @Column({ length: 60 })
    title: string;

    @Column({ length: 2000 })
    description: string;

    @Column({ type: "decimal" })
    km: number;

    @Column()
    year: number;

    @Column({ type: "decimal" })
    value: number;

    @OneToOne(() => ImageGalery, { eager: true, onDelete: "CASCADE" })
    @JoinColumn()
    imageGalery: ImageGalery;

    @ManyToOne(() => User, (user) => user.vehicles)
    users: User;

    @OneToMany(() => Comment, (comment) => comment.vehicles)
    comments: Comment[];
}

