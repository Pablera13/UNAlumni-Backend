import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileToSkillDto } from './dto/create-profile-to-skill.dto';
import { UpdateProfileToSkillDto } from './dto/update-profile-to-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileToSkill } from './entities/profile-to-skill.entity';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { SkillService } from 'src/skill/skill.service';

@Injectable()
export class ProfileToSkillService {

  constructor(
    @InjectRepository(ProfileToSkill) private profileToSkillRepository: Repository<ProfileToSkill>,
    private profileService: ProfileService,
    private skillService: SkillService
    ){} 
  async create(relation: CreateProfileToSkillDto) {
    const profileFound = await this.profileService.findOne(relation.profileId)
    const skillFound = await this.skillService.findOne(relation.skillId)
    if(!profileFound) {return new HttpException('Profile not found', HttpStatus.NOT_FOUND)
    }
    else if(!skillFound) {return new HttpException('Skill not found', HttpStatus.NOT_FOUND)
    }
    
    const relationCreated = this.profileToSkillRepository.create(relation)
    
    await this.profileToSkillRepository.save(relationCreated)
    return relationCreated;
  }

  findAll() {
    return this.profileToSkillRepository.find({
      relations:['profile','skill']
    });
  }

  findOne(pId: number, sId: number) {
    return this.profileToSkillRepository.find({
      where: {
        profileId: pId,
        skillId: sId
      },
    })
  }

  async update(id1: number, id2: number, updateProfileToSkillDto: UpdateProfileToSkillDto) {
    await this.profileToSkillRepository.createQueryBuilder().update(ProfileToSkill).set(updateProfileToSkillDto)
    .where('profileId = :profileId', {profileId: id1}).andWhere('skillId = :skillId', {skillId: id2})
    .execute()
    return updateProfileToSkillDto;
  }

  async remove(id1: number, id2: number) {
    await this.profileToSkillRepository.createQueryBuilder().delete().from(ProfileToSkill)
    .where('profileId = :profileId', {profileId: id1}).andWhere('skillId = :skillId', {skillId: id2})
    .execute()
    return `The relation with the profileId #${id1} and the skillId #${id2} was deleted`;
  }
}
