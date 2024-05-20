import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class OfferService {
  constructor(@InjectRepository(Offer) private offerRepository: Repository<Offer>,
  private companyService: CompanyService
  ){}

  async create(createOfferDto: CreateOfferDto) {
    const companyFound = await this.companyService.findOne(createOfferDto.companyId)
    if(!companyFound) throw new HttpException('Company not found', HttpStatus.NOT_FOUND )
    return await this.offerRepository.save({...createOfferDto, company: companyFound})
  }

  findAll() {
    return this.offerRepository.find({
      relations: ['skills.skill']
    });
  }

  async findOne(id: number) {
    const offerFound = await this.offerRepository.findOne({
        where: { id },
        relations: ['skills.skill']
    });
    if (!offerFound) throw new HttpException(`Offer with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return offerFound;
}

async update(id: number, updateOfferDto: UpdateOfferDto) {
    const offerFound = await this.offerRepository.findOneBy({ id });
    if (!offerFound) throw new HttpException(`Offer with ID ${id} not found`, HttpStatus.NOT_FOUND);
    await this.offerRepository.update(id, updateOfferDto);
    return updateOfferDto;
}

async remove(id: number) {
    const offerFound = await this.offerRepository.findOneBy({ id });
    if (!offerFound) throw new HttpException(`Offer with ID ${id} not found`, HttpStatus.NOT_FOUND);
    await this.offerRepository.delete(id);
    return `The offer with the id #${id} was deleted`;
}

}
