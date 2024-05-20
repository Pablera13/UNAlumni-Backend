import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguageService {

  constructor(@InjectRepository(Language) private languageRepository: Repository<Language>
  ){}
  async create(language: CreateLanguageDto) {
    const languageCreated = this.languageRepository.create(language)
    await this.languageRepository.save(languageCreated)
    return languageCreated;
  }

  findAll() {
    return this.languageRepository.find();
  }

  async findOne(id: number) {
    const languageFound = await this.languageRepository.findOneBy({ id });
    if (!languageFound) throw new HttpException(`Language with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return languageFound;
}

async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    const languageFound = await this.languageRepository.findOneBy({ id });
    if (!languageFound) throw new HttpException(`Language with ID ${id} not found`, HttpStatus.NOT_FOUND);
    await this.languageRepository.update(id, updateLanguageDto);
    return updateLanguageDto;
}

async remove(id: number) {
    const languageFound = await this.languageRepository.findOneBy({ id });
    if (!languageFound) throw new HttpException(`Language with ID ${id} not found`, HttpStatus.NOT_FOUND);
    await this.languageRepository.delete(id);
    return `The language with the id #${id} was deleted`;
}

}
