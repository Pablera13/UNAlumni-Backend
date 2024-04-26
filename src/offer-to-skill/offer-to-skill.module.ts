import { Module } from '@nestjs/common';
import { OfferToSkillService } from './offer-to-skill.service';
import { OfferToSkillController } from './offer-to-skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferToSkill } from './entities/offer-to-skill.entity';
import { OfferModule } from 'src/offer/offer.module';
import { SkillModule } from 'src/skill/skill.module';

@Module({
  imports: [TypeOrmModule.forFeature([OfferToSkill]), OfferModule, SkillModule],
  controllers: [OfferToSkillController],
  providers: [OfferToSkillService]
})
export class OfferToSkillModule {}
