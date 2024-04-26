import { OfferToSkill } from "src/offer-to-skill/entities/offer-to-skill.entity";
import { ProfileToSkill } from "src/profile-to-skill/entities/profile-to-skill.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('skills')
export class Skill {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    icon: string

    @OneToMany(() => ProfileToSkill, profileToSkill => profileToSkill.skill)
    relationToProfile: ProfileToSkill[];

    @OneToMany(()=> OfferToSkill, offerToSkill => offerToSkill.skill)
    relationToOffer: OfferToSkill[]
}
