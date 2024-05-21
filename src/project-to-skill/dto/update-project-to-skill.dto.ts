import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectToSkillDto } from './create-project-to-skill.dto';

export class UpdateProjectToSkillDto extends PartialType(CreateProjectToSkillDto) {}
