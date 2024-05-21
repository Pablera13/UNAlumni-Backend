import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository:Repository<Project>,
    private profileService: ProfileService
  ){}

  async create(project: CreateProjectDto) {
    const profileFound = await this.profileService.findOne(project.profileId)
    
    if(!profileFound) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
    return await this.projectRepository.save({...project, profile: profileFound})

  }

  findAll() {
    return this.projectRepository.find({
      relations: ['skills.skill']
    });
  }

  async findOne(id: number) {
    const offerFound = await this.projectRepository.findOne({
        where: { id },
        relations: ['skills.skill']
    });
    if (!offerFound) throw new HttpException(`Project with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return offerFound;
}

async update(id: number, updateProjectDto: UpdateProjectDto) {
    const projectFound = await this.projectRepository.findOneBy({ id });
    if (!projectFound) throw new HttpException(`Project with ID ${id} not found`, HttpStatus.NOT_FOUND);
    
    await this.projectRepository.update(id, updateProjectDto);
    return updateProjectDto;
}

async remove(id: number) {
    const projectFound = await this.projectRepository.findOneBy({ id });
    if (!projectFound) throw new HttpException(`Project with ID ${id} not found`, HttpStatus.NOT_FOUND);
    
    await this.projectRepository.delete(id);
    return `The project with the id #${id} was deleted`;
}

}
