import { Profile } from "src/profile/entities/profile.entity"
import { Skill } from "src/skill/entities/skill.entity"

export class CreateProfileToSkillDto {

    level:string

    profileId: number

    skillId: number
    
}
