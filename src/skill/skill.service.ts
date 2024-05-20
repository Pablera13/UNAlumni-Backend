import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findOne(id: number) {
    const skillFound = await this.skillRepository.findOneBy({ id });
    if (!skillFound) throw new HttpException(`Skill with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return skillFound;
}

async update(id: number, updateSkillDto: UpdateSkillDto) {
    const skillFound = await this.skillRepository.findOneBy({ id });
    if (!skillFound) throw new HttpException(`Skill with ID ${id} not found`, HttpStatus.NOT_FOUND);
    
    await this.skillRepository.update(id, updateSkillDto);
    return updateSkillDto;
}

async remove(id: number) {
    const skillFound = await this.skillRepository.findOneBy({ id });
    if (!skillFound) throw new HttpException(`Skill with ID ${id} not found`, HttpStatus.NOT_FOUND);
    
    await this.skillRepository.delete(id);
    return `The skill with the id #${id} was deleted`;
}

}
