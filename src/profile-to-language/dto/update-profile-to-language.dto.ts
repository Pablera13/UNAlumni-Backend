import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileToLanguageDto } from './create-profile-to-language.dto';

export class UpdateProfileToLanguageDto extends PartialType(CreateProfileToLanguageDto) {}
