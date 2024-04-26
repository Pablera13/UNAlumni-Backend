import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill) private skillRepository:Repository<Skill>,
   
  ){}

  async create(skill: CreateSkillDto) {
    const skillCreated = this.skillRepository.create(skill)
    await this.skillRepository.save(skillCreated)
    return skillCreated;
  }

  findAll() {
    return this.skillRepository.find();
  }

  findOne(id: number) {
    return this.skillRepository.findOneBy({id});
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    await this.skillRepository.update(id, updateSkillDto)
    return updateSkillDto;
  }

  async remove(id: number) {
    await this.skillRepository.delete(id)
    return `The education with the id #${id} was deleted`;
  }
}
