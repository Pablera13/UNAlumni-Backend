import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileToLanguageDto } from './dto/create-profile-to-language.dto';
import { UpdateProfileToLanguageDto } from './dto/update-profile-to-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileToLanguage } from './entities/profile-to-language.entity';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { LanguageService } from 'src/language/language.service';

@Injectable()
export class ProfileToLanguageService {
  constructor(@InjectRepository(ProfileToLanguage) private profileToLanguageRepository: Repository<ProfileToLanguage>,
  private profileService: ProfileService,
  private languageService: LanguageService
  ){}
  async create(profileToLanguage: CreateProfileToLanguageDto) {
    const profileFound = this.profileService.findOne(profileToLanguage.profileId)
    const languageFound = this.languageService.findOne(profileToLanguage.languageId)
    
    if(!profileFound){return new HttpException('Profile not found', HttpStatus.NOT_FOUND)
    }
    else if(!languageFound) {return new HttpException('Language not found', HttpStatus.NOT_FOUND)
    }
    const relationCreated = this.profileToLanguageRepository.create(profileToLanguage)
    await this.profileToLanguageRepository.save(relationCreated)
    return relationCreated;
  }

  findAll() {
    return this.profileToLanguageRepository.find();
  }

  findOne(pId: number, lId:number) {
    return this.profileToLanguageRepository.find({
      where:{
        profileId: pId,
        languageId: lId
      },
    })
    //return `This action returns a #${id} profileToLanguage`;
  }

  async update(id1: number, id2: number, updateProfileToLanguageDto: UpdateProfileToLanguageDto) {  
    await this.profileToLanguageRepository.createQueryBuilder()
    .update(ProfileToLanguage).set(updateProfileToLanguageDto)
    .where('profileId = :profileId', {profileId: id1}).andWhere('languageId = :languageId',{languageId: id2})
    .execute()
    return updateProfileToLanguageDto;
  }

  async remove(id1: number, id2:number) {
    await this.profileToLanguageRepository.createQueryBuilder().delete().from(ProfileToLanguage)
    .where('profileId = :profileId', {profileId: id1}).andWhere('languageId = :languageId',{languageId: id2})
    .execute()
    return `The relation with the profileId #${id1} and the languageId #${id2}was deleted`;
  }
}
