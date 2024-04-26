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
    
    if(!profileFound) return new HttpException('Profile not found', HttpStatus.NOT_FOUND)
    const projectCreated = this.projectRepository.create(project)
    await this.projectRepository.save(projectCreated)
 
    return projectCreated;
  }

  findAll() {
    return this.projectRepository.find();
  }

  findOne(id: number) {
    return this.projectRepository.findOneBy({id});
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    await this.projectRepository.update(id, updateProjectDto) 
    return updateProjectDto;
  }

  async remove(id: number) {
    await this.projectRepository.delete(id)
    return `The project with the id #${id} was deleted`;
  }
}
