import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 11 })
  cep: string;

  @Column({ length: 40 })
  state: string;

  @Column({ length: 80 })
  city: string;

  @Column({ length: 200 })
  street: string;

  @Column({ length: 10, nullable: true, default: "S/N" })
  number: string;

  @Column({ length: 20, nullable: true })
  complement: string;

  @OneToOne(() => User)
  @JoinColumn()
  users: User;
}