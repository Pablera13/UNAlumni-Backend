import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOfferToSkillDto } from './dto/create-offer-to-skill.dto';
import { UpdateOfferToSkillDto } from './dto/update-offer-to-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferToSkill } from './entities/offer-to-skill.entity';
import { Repository } from 'typeorm';
import { SkillService } from 'src/skill/skill.service';
import { OfferService } from 'src/offer/offer.service';

@Injectable()
export class OfferToSkillService {
  constructor(@InjectRepository(OfferToSkill) private offerToSkillRepository: Repository<OfferToSkill>,
  private skillService: SkillService,
  private offerService: OfferService
  ){}
  
  async create(createOfferToSkillDto: CreateOfferToSkillDto) {
    const offerFound = this.offerService.findOne(createOfferToSkillDto.offerId)
    const skillFound = this.skillService.findOne(createOfferToSkillDto.skillId)
    
    if(!offerFound){return new HttpException('Offer not found', HttpStatus.NOT_FOUND)
    }
    else if(!skillFound) {return new HttpException('Skill not found', HttpStatus.NOT_FOUND)
    }
    const relationCreated = this.offerToSkillRepository.create(createOfferToSkillDto)
    await this.offerToSkillRepository.save(relationCreated)
    return relationCreated;
  }

  findAll() {
    return this.offerToSkillRepository.find();
  }

  findOne(oid: number, sid: number) {
    return this.offerToSkillRepository.find(
      {
        where: {
          offerId: oid,
          skillId: sid
        }
      }
    )
  }

  async update(id1: number, id2: number, updateOfferToSkillDto: UpdateOfferToSkillDto) {
    await this.offerToSkillRepository.createQueryBuilder()
    .update(OfferToSkill).set(updateOfferToSkillDto)
    .where('offerId = :offerId', {offerId: id1}).andWhere('skillId = :skillId', {skillId: id2})
    .execute()
    return updateOfferToSkillDto;
  }

  async remove(id1: number, id2: number) {
    await this.offerToSkillRepository.createQueryBuilder()
    .where('offerId = :offerId', {offerId: id1})
    .andWhere('skillId = :skillId', {skillId: id2})
    .execute()
    return `The relation with the offerId #${id1} and the skillId #${id2} was deleted`;
  }
}
