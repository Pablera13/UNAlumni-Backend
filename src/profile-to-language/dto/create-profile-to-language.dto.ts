import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateProfileToLanguageDto {

    @IsNotEmpty()
    @IsString()
    level: string
    
    @IsNotEmpty()
    @IsInt()
    profileId: number

    @IsNotEmpty()
    @IsInt()
    languageId: number

}
