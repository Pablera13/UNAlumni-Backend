import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>){

  }
  async create(companyDto: CreateCompanyDto) {
    const companyCreated = this.companyRepository.create(companyDto)
    await this.companyRepository.save(companyCreated)
    return companyCreated;
  }

  findAll() {
    return this.companyRepository.find();
  }

  findOne(id: number) {
    return this.companyRepository.findOne({
      where: {id:id},
      relations: ['offers','offers.skills.skill']
    }
    );
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    await this.companyRepository.update(id, updateCompanyDto)
    return updateCompanyDto;
  }

  async remove(id: number) {
    await this.companyRepository.delete(id)
    return `The company with the id #${id} was deleted`;
  }
}
