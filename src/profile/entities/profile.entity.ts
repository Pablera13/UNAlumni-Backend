import { Education } from "src/education/entities/education.entity"
import { ProfileToLanguage } from "src/profile-to-language/entities/profile-to-language.entity"
import { ProfileToSkill } from "src/profile-to-skill/entities/profile-to-skill.entity"
import { Project } from "src/project/entities/project.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity('profile')
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    lastNameOne: string
    
    @Column()
    lastNameTwo: string
    
    @Column()
    career: string
    
    @Column()
    birthdate: Date
    
    @Column()
    email: string

    @Column()
    password: string

    @Column()
    image: string
    
    @Column({nullable: true})
    phone: number
    
    @Column({nullable: true})
    address: string
    
    @Column()
    summary: string

    @Column({nullable: true})
    github: string

    @Column({nullable: true})
    linkedin: string
    
    @Column()
    resume: string

    @OneToMany(() => Education, education => education.owner)
    educations: Education[]

    @OneToMany(() => Project, project => project.owner)
    projects: Project[]

    @OneToMany(() => ProfileToSkill, profileToSkill => profileToSkill.profile)
    skills: ProfileToSkill[]

    @OneToMany(() => ProfileToLanguage, profileToLanguage => profileToLanguage.profile)
    languages: ProfileToLanguage[]
} 