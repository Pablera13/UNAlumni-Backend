import { Module } from '@nestjs/common';
import { ProfileToLanguageService } from './profile-to-language.service';
import { ProfileToLanguageController } from './profile-to-language.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileToLanguage } from './entities/profile-to-language.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { LanguageModule } from 'src/language/language.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileToLanguage]), ProfileModule, LanguageModule],
  controllers: [ProfileToLanguageController],
  providers: [ProfileToLanguageService]
})
export class ProfileToLanguageModule {}
