import { profile } from "console";
import { Language } from "src/language/entities/language.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('profiletolanguage')
export class ProfileToLanguage {


    @Column()
    level: string

    @PrimaryColumn()
    profileId: number

    @PrimaryColumn()
    languageId: number

    @ManyToOne(()=> Profile, (profile) => profile.languages)
    profile: Profile

    @ManyToOne(()=> Language, (language) => language.languageToProfile)
    language: Language

}
