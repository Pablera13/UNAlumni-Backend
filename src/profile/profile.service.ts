import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(Profile) private profileRepository:Repository<Profile>){

  }

  async create(createProfileDto: CreateProfileDto) {
    const profileCreated = this.profileRepository.create(createProfileDto);
    await this.profileRepository.save(profileCreated);
    return profileCreated;
  }

  findAll() {
    return this.profileRepository.find({
      relations:["skills.skill"]
    });
  }

  findOne(id: number) {
    return this.profileRepository.findOne({
      where: {id: id},
      relations:["educations","projects","skills.skill","languages.language"]
    })
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    await this.profileRepository.update(id, updateProfileDto);
    return updateProfileDto;
  }

  async remove(id: number) {
    await this.profileRepository.delete(id);
    return `The profile with the id #${id} was deleted`;
  }
}
