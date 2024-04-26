import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports:[TypeOrmModule.forFeature([Education]), ProfileModule],
  controllers: [EducationController],
  providers: [EducationService]
})
export class EducationModule {}
