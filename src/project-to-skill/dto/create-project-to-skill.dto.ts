import { IsInt, IsNotEmpty } from "class-validator";

export class CreateProjectToSkillDto {

    @IsNotEmpty()
    @IsInt()
    projectId: number;

    @IsNotEmpty()
    @IsInt()
    skillId: number;

}


