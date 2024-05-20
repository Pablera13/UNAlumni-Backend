import { Offer } from "src/offer/entities/offer.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(()=> Offer, offer => offer.company)
    offers: Offer[]

    @OneToOne(() => User, {eager: true})
    @JoinColumn()
    user: User;

}
