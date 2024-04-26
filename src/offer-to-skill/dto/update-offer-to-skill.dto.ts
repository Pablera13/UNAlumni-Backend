import { PartialType } from '@nestjs/mapped-types';
import { CreateOfferToSkillDto } from './create-offer-to-skill.dto';

export class UpdateOfferToSkillDto extends PartialType(CreateOfferToSkillDto) {}
