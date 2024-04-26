import { Offer } from "src/offer/entities/offer.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('companies')
export class Company {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    address: string

    @Column()
    image:string

    @Column()
    phone: number

    @Column()
    email: string

    @Column()
    description: string

    @Column()
    website: string

    @Column()
    password: string

    @OneToMany(()=> Offer, offer => offer.company)
    offers: Offer[]

}
