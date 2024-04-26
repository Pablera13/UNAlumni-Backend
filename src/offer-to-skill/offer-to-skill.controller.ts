import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OfferToSkillService } from './offer-to-skill.service';
import { CreateOfferToSkillDto } from './dto/create-offer-to-skill.dto';
import { UpdateOfferToSkillDto } from './dto/update-offer-to-skill.dto';

@Controller('offer-to-skill')
export class OfferToSkillController {
  constructor(private readonly offerToSkillService: OfferToSkillService) {}

  @Post()
  create(@Body() createOfferToSkillDto: CreateOfferToSkillDto) {
    return this.offerToSkillService.create(createOfferToSkillDto);
  }

  @Get()
  findAll() {
    return this.offerToSkillService.findAll();
  }

  @Get(':id1/:id2')
  findOne(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.offerToSkillService.findOne(+id1,+id2);
  }

  @Patch(':id1/:id2')
  update(@Param('id1') id1: string, @Param('id2') id2: string, @Body() updateOfferToSkillDto: UpdateOfferToSkillDto) {
    return this.offerToSkillService.update(+id1, +id2, updateOfferToSkillDto);
  }

  @Delete(':id1/:id2')
  remove(@Param('id1') id1: string, @Param("id2") id2: string) {
    return this.offerToSkillService.remove(+id1, +id2);
  }
}
