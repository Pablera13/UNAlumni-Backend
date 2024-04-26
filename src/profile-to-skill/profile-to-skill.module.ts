import { Module } from '@nestjs/common';
import { ProfileToSkillService } from './profile-to-skill.service';
import { ProfileToSkillController } from './profile-to-skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileToSkill } from './entities/profile-to-skill.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { SkillModule } from 'src/skill/skill.module';

@Module({
  imports:[TypeOrmModule.forFeature([ProfileToSkill]), ProfileModule, SkillModule],
  controllers: [ProfileToSkillController],
  providers: [ProfileToSkillService]
})
export class ProfileToSkillModule {}
