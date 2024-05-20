import { IsNotEmpty, IsString, IsDateString, IsInt } from 'class-validator';

export class CreateProjectDto {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsDateString() 
    startDate: Date

    @IsNotEmpty()
    @IsDateString() 
    finishDate: Date

    @IsNotEmpty()
    @IsString()
    image: string

    @IsNotEmpty()
    @IsInt()
    profileId: number
}
