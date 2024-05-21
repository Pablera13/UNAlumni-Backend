import { Module } from '@nestjs/common';
import { ProjectToSkillService } from './project-to-skill.service';
import { ProjectToSkillController } from './project-to-skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectToSkill } from './entities/project-to-skill.entity';
import { ProjectModule } from 'src/project/project.module';
import { SkillModule } from 'src/skill/skill.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectToSkill]), ProjectModule, SkillModule],
  controllers: [ProjectToSkillController],
  providers: [ProjectToSkillService]
})
export class ProjectToSkillModule {}


  