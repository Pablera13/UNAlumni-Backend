import { Profile } from "src/profile/entities/profile.entity";
import { Skill } from "src/skill/entities/skill.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('profiletoskill')
export class ProfileToSkill {

    @Column()
    level: string;
    
    @PrimaryColumn()
    profileId: number

    @PrimaryColumn()
    skillId: number
    
    @ManyToOne(()=> Profile, (profile) => profile.skills)
    profile: Profile;

    @ManyToOne(()=> Skill, (skill) => skill.relationToProfile)
    skill: Skill;

}
