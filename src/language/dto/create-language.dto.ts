import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateLanguageDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    icon: string
}
