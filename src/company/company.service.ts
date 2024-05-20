import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>,
  private userService: UsersService
){}

  async create(companyDto: CreateCompanyDto) {
    const userFound = await this.userService.findOne(companyDto.userId)

    if(!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    return await this.companyRepository.save({...companyDto, user: userFound})
  }

  findAll() {
    return this.companyRepository.find();
  }

  async findOne(id: number) {
    const companyFound = await this.companyRepository.findOne({
      where: {id}, relations: ["offers","offers.skills.skill"]});
    if (!companyFound) throw new HttpException(`Company with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return companyFound;
  }


  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const companyFound = await this.companyRepository.findOneBy({id});
    if (!companyFound) throw new HttpException(`Company with ID ${id} not found`, HttpStatus.NOT_FOUND);
    await this.companyRepository.update(id, updateCompanyDto);
    return await this.companyRepository.findOneBy({id});
  }

  async remove(id: number) {
    const companyFound = await this.companyRepository.findOneBy({id});
    if (!companyFound) throw new HttpException(`Company with ID ${id} not found`, HttpStatus.NOT_FOUND);
    await this.companyRepository.delete(id)
    return `The company with the id #${id} was deleted`;
  }
}
