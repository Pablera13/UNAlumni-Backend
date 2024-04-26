import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileToLanguageService } from './profile-to-language.service';
import { CreateProfileToLanguageDto } from './dto/create-profile-to-language.dto';
import { UpdateProfileToLanguageDto } from './dto/update-profile-to-language.dto';

@Controller('profile-to-language')
export class ProfileToLanguageController {
  constructor(private readonly profileToLanguageService: ProfileToLanguageService) {}

  @Post()
  create(@Body() createProfileToLanguageDto: CreateProfileToLanguageDto) {
    return this.profileToLanguageService.create(createProfileToLanguageDto);
  }

  @Get()
  findAll() {
    return this.profileToLanguageService.findAll();
  }

  @Get(':id1/:id2')
  findOne(@Param('id1') id1: string, @Param('id2') id2:string) {
    return this.profileToLanguageService.findOne(+id1, +id2);
  }

  @Patch(':id1/:id2')
  update(@Param('id1') id1: string, @Param('id2') id2:string, @Body() updateProfileToLanguageDto: UpdateProfileToLanguageDto) {
    return this.profileToLanguageService.update(+id1, +id2, updateProfileToLanguageDto);
  }

  @Delete(':id1/:id2')
  remove(@Param('id1') id1: string, @Param('id2') id2:string) {
    return this.profileToLanguageService.remove(+id1, +id2);
  }
}
