import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileToSkillService } from './profile-to-skill.service';
import { CreateProfileToSkillDto } from './dto/create-profile-to-skill.dto';
import { UpdateProfileToSkillDto } from './dto/update-profile-to-skill.dto';

@Controller('profile-to-skill')
export class ProfileToSkillController {
  constructor(private readonly profileToSkillService: ProfileToSkillService) {}

  @Post()
  create(@Body() createProfileToSkillDto: CreateProfileToSkillDto) {
    return this.profileToSkillService.create(createProfileToSkillDto);
  }

  @Get()
  findAll() {
    return this.profileToSkillService.findAll();
  }

  @Get(':id1/:id2')
  findOne(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.profileToSkillService.findOne(+id1, +id2);
  }

  @Patch(':id1/:id2')
  update(@Param('id1') id1: string, @Param('id2') id2: string, @Body() updateProfileToSkillDto: UpdateProfileToSkillDto) {
    return this.profileToSkillService.update(+id1, +id2, updateProfileToSkillDto);
  }

  @Delete(':id1/:id2')
  remove(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.profileToSkillService.remove(+id1, +id2);
  }
}
