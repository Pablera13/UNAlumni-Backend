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
    const companyFound = this.companyService.findOne(createOfferDto.companyId)
    if(!companyFound) return new HttpException('Company not found', HttpStatus.NOT_FOUND )
    const offerCreated = this.offerRepository.create(createOfferDto)
    await this.offerRepository.save(offerCreated)
    return offerCreated;
  }

  findAll() {
    return this.offerRepository.find({
      relations: ['skills.skill']
    });
  }

  findOne(id: number) {
    return this.offerRepository.findOneBy({id});
  }

  async update(id: number, updateOfferDto: UpdateOfferDto) {
    await this.offerRepository.update(id,updateOfferDto)
    return updateOfferDto;
  }

  async remove(id: number) {
    await this.offerRepository.delete(id)
    return `The offer with the id #${id} was deleted`;
  }
}
