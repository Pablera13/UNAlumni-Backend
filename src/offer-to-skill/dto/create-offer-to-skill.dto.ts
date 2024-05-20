import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateOfferToSkillDto {

    @IsNotEmpty()
    @IsInt()
    offerId: number;

    @IsNotEmpty()
    @IsInt()
    skillId: number;
}
