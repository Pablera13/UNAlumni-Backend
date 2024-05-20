import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateProfileToSkillDto {

    @IsNotEmpty()
    @IsString()
    level: string

    @IsNotEmpty()
    @IsInt()
    profileId: number

    @IsNotEmpty()
    @IsInt()
    skillId: number
}
