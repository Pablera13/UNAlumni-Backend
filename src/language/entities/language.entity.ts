import { ProfileToLanguage } from "src/profile-to-language/entities/profile-to-language.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('language')
export class Language {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    icon: string

    @OneToMany(()=> ProfileToLanguage, profileToLanguage => profileToLanguage.language)
    languageToProfile: ProfileToLanguage[]


}
