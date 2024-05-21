import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectToSkillDto } from './dto/create-project-to-skill.dto';
import { UpdateProjectToSkillDto } from './dto/update-project-to-skill.dto';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ProjectToSkill } from './entities/project-to-skill.entity';
import { Repository } from 'typeorm';
import { SkillService } from 'src/skill/skill.service';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class ProjectToSkillService {
  constructor(@InjectRepository(ProjectToSkill) private projectToSkillRepository: Repository<ProjectToSkill>,
  private skillService: SkillService,
  private projectService: ProjectService
  ){}

  async  create(createProjectToSkillDto: CreateProjectToSkillDto) {
    const projectFound = await this.projectService.findOne(createProjectToSkillDto.projectId)
    const skillFound = await this.skillService.findOne(createProjectToSkillDto.skillId)
    
    if(!projectFound){return new HttpException('Project not found', HttpStatus.NOT_FOUND)
    }
    else if(!skillFound) {return new HttpException('Skill not found', HttpStatus.NOT_FOUND)
    }
    const relationCreated = this.projectToSkillRepository.create(createProjectToSkillDto)
    await this.projectToSkillRepository.save(relationCreated)
    return relationCreated;
  }


  findAll() {
    return this.projectToSkillRepository.find();
  }

  findOne(pid: number, sid: number) {
    return this.projectToSkillRepository.find(
      {
        where: {
          projectId: pid,
          skillId: sid
        }
      }
    )
  }
  async update(id1: number, id2: number, updateProjectToSkillDto: UpdateProjectToSkillDto) {
    await this.projectToSkillRepository.createQueryBuilder()
    .update(ProjectToSkill).set(updateProjectToSkillDto)
    .where('projectId = :projectId', {projectId: id1}).andWhere('skillId = :skillId', {skillId: id2})
    .execute()
    return updateProjectToSkillDto;
  }

  async remove(id1: number, id2: number) {
    await this.projectToSkillRepository.createQueryBuilder().delete().from(ProjectToSkill)
      .where('projectId = :projectId', { projectId: id1 })
      .andWhere('skillId = :skillId', { skillId: id2 })
      .execute();
    return `The relation with the projectId #${id1} and the skillId #${id2} was deleted`;
  }
  
}
