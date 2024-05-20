import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(Profile) private profileRepository:Repository<Profile>,
  private userService: UsersService
){

  }

  async create(createProfileDto: CreateProfileDto) {
    const userFound = await this.userService.findOne(createProfileDto.userId)
    if(!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    return await this.profileRepository.save({...createProfileDto, user: userFound})
  }

  findAll() {
    return this.profileRepository.find({
      relations:["skills.skill"]
    });
  }

  async findOne(id: number) {
    const profileFound = await this.profileRepository.findOne({
        where: { id },
        relations: ["educations", "projects", "skills.skill", "languages.language"]
    });
    if (!profileFound) throw new HttpException(`Profile with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return profileFound;
}

async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profileFound = await this.profileRepository.findOneBy({ id });
    if (!profileFound) throw new HttpException(`Profile with ID ${id} not found`, HttpStatus.NOT_FOUND);
    
    await this.profileRepository.update(id, updateProfileDto);
    return updateProfileDto;
}

async remove(id: number) {
    const profileFound = await this.profileRepository.findOneBy({ id });
    if (!profileFound) throw new HttpException(`Profile with ID ${id} not found`, HttpStatus.NOT_FOUND);
    
    await this.profileRepository.delete(id);
    return `The profile with the id #${id} was deleted`;
}

}
