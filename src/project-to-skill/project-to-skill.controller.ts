import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectToSkillService } from './project-to-skill.service';
import { CreateProjectToSkillDto } from './dto/create-project-to-skill.dto';
import { UpdateProjectToSkillDto } from './dto/update-project-to-skill.dto';

@Controller('project-to-skill')
export class ProjectToSkillController {
  constructor(private readonly projectToSkillService: ProjectToSkillService) {}

  @Post()
  create(@Body() createProjectToSkillDto: CreateProjectToSkillDto) {
    return this.projectToSkillService.create(createProjectToSkillDto);
  }

  @Get()
  findAll() {
    return this.projectToSkillService.findAll();
  }

  @Get(':id1/:id2')
  findOne(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.projectToSkillService.findOne(+id1,+id2);
  }

  @Patch(':id1/:id2')
  update(@Param('id1') id1: string, @Param('id2') id2: string, @Body() updateProjectToSkillDto: UpdateProjectToSkillDto) {
    return this.projectToSkillService.update(+id1, +id2, updateProjectToSkillDto);
  }

  @Delete(':id1/:id2')
  remove(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.projectToSkillService.remove(+id1, +id2);
  }
}
