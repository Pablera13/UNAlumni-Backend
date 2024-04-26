import { Company } from "src/company/entities/company.entity";
import { OfferToSkill } from "src/offer-to-skill/entities/offer-to-skill.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('offers')
export class Offer {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    job: string

    @Column()
    description: string

    @Column()
    status: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(()=> Company, (company) => company.offers)
    company: Company;

    @OneToMany(()=> OfferToSkill, offerToSkill => offerToSkill.offer)
    skills: OfferToSkill[]
}
