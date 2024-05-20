/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import dbConfig from 'src/config/database.config';
import { MySqlConfig } from './config/mysql.config';
import { ProfileModule } from './profile/profile.module';
import { EducationModule } from './education/education.module';
import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';
import { ProfileToSkillModule } from './profile-to-skill/profile-to-skill.module';
import { LanguageModule } from './language/language.module';
import { ProfileToLanguageModule } from './profile-to-language/profile-to-language.module';
import { CompanyModule } from './company/company.module';
import { OfferModule } from './offer/offer.module';
import { OfferToSkillModule } from './offer-to-skill/offer-to-skill.module';


import * as dotenv from 'dotenv'

dotenv.config()

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       load: [dbConfig],
//       envFilePath: [`./envs/.env.${process.env.APP_ENV}`],
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useClass:MySqlConfig,
//       inject:[MySqlConfig]
//       // useFactory: async (configService: ConfigService) => ({
//       //   ...(await configService.get('database')),
//       // }),
//       // inject: [ConfigService],
//     }),


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'unalumni_test',
        entities: [join(__dirname, '**', '*.entity.js')],
        synchronize: true, 
        retryAttempts: 3,
      }),
    }),

    UsersModule,
    ProfileModule,
    EducationModule,
    ProjectModule,
    SkillModule,
    ProfileToSkillModule,
    LanguageModule,
    ProfileToLanguageModule,
    CompanyModule,
    OfferModule,
    OfferToSkillModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
