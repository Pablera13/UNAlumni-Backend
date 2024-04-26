import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ProfileService } from 'src/profile/profile.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';


@Injectable()
export class EducationService {

  constructor(
    @InjectRepository(Education) private educationRepository:Repository<Education>,
    private profileService: ProfileService
  ){}

   async create(education: CreateEducationDto) {
    const profileFound = await this.profileService.findOne(education.profileId)

    if(!profileFound) return new HttpException('Profile not found', HttpStatus.NOT_FOUND)
    
     const educationCreated =  this.educationRepository.create(education)
     await this.educationRepository.save(educationCreated);
    return educationCreated;
  }

  findAll() {
    return this.educationRepository.find();
  }

  findOne(id: number) {
    return this.educationRepository.findOneBy({id});
  }

  async update(id: number, updateEducationDto: UpdateEducationDto) {
    await this.educationRepository.update(id, updateEducationDto)
    return updateEducationDto;
  }

  async remove(id: number) {
    await this.educationRepository.delete(id)
    return `The education with the id #${id} was deleted`;
  }
}
