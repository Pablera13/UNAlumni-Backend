import { Project } from "src/project/entities/project.entity"
import { Skill } from "src/skill/entities/skill.entity"
import { Entity, ManyToOne, PrimaryColumn } from "typeorm"

@Entity('projecttoskill')
export class ProjectToSkill {
    @PrimaryColumn()
    projectId: number

    @PrimaryColumn()
    skillId: number

    @ManyToOne(()=> Project, (project) => project.skills)
    project: Project

    @ManyToOne(()=> Skill, (skill) => skill.relationToOffer)
    skill: Skill
}