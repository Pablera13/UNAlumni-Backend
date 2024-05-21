import { Profile } from "src/profile/entities/profile.entity";
import { ProjectToSkill } from "src/project-to-skill/entities/project-to-skill.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('projects')
export class Project {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    startDate: Date

    @Column()
    finishDate: Date

    @Column()
    image: string

    @ManyToOne(()=> Profile, (profile) => profile.projects)
    owner: Profile;

    @OneToMany(()=> ProjectToSkill, projectToSkill => projectToSkill.project)
    skills: ProjectToSkill[]
}
