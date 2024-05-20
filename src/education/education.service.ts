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

    if(!profileFound) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
    return await this.educationRepository.save({...education, profile: profileFound})

  }

  findAll() {
    return this.educationRepository.find();
  }

  async findOne(id: number) {
    const educationFound = await this.educationRepository.findOneBy({ id });
    if (!educationFound) throw new HttpException(`Education with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return educationFound;
}

async update(id: number, updateEducationDto: UpdateEducationDto) {
    const educationFound = await this.educationRepository.findOneBy({ id });
    if (!educationFound) throw new HttpException(`Education with ID ${id} not found`, HttpStatus.NOT_FOUND);
    await this.educationRepository.update(id, updateEducationDto);
    return await this.educationRepository.findOneBy({ id });
}

async remove(id: number) {
    const educationFound = await this.educationRepository.findOneBy({ id });
    if (!educationFound) throw new HttpException(`Education with ID ${id} not found`, HttpStatus.NOT_FOUND);
    await this.educationRepository.delete(id);
    return `The education with the id #${id} was deleted`;
}

}
