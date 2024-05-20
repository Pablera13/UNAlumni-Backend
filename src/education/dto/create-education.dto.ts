import { IsNotEmpty, IsString, IsNumber, IsDateString, IsInt } from 'class-validator';

export class CreateEducationDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNumber()
    duration: number

    @IsNotEmpty()
    @IsDateString() 
    startDate: Date

    @IsNotEmpty()
    @IsDateString() 
    finishDate: Date

    @IsString()
    image: string

    @IsNotEmpty()
    @IsInt()
    profileId: number
}
