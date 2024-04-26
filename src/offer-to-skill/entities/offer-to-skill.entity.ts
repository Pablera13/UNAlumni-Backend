import { Offer } from "src/offer/entities/offer.entity";
import { Skill } from "src/skill/entities/skill.entity";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('offertoskill')
export class OfferToSkill {
    @PrimaryColumn()
    offerId: number

    @PrimaryColumn()
    skillId: number

    @ManyToOne(()=> Offer, (offer) => offer.skills)
    offer: Offer

    @ManyToOne(()=> Skill, (skill) => skill.relationToOffer)
    skill: Skill
}
