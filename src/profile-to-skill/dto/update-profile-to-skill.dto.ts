import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileToSkillDto } from './create-profile-to-skill.dto';

export class UpdateProfileToSkillDto extends PartialType(CreateProfileToSkillDto) {}
