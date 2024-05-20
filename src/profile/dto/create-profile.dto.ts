import { IsInt, IsString, IsBoolean, IsNotEmpty, IsEmail, IsDateString } from 'class-validator';

export class CreateProfileDto {

    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsString()
    lastNameOne: string
    
    @IsNotEmpty()
    @IsString()
    lastNameTwo: string
    
    @IsNotEmpty()
    @IsString()
    career: string
    
    @IsNotEmpty()
    @IsDateString() 
    birthdate: Date

    @IsNotEmpty()
    @IsString()
    image: string
    
    @IsInt()
    phone: number    

    @IsString()
    address: string    

    @IsNotEmpty()
    @IsString()
    summary: string

    @IsString()
    github: string    

    @IsString()
    linkedin: string    

    @IsNotEmpty()
    @IsString()
    resume: string

    @IsNotEmpty()
    @IsInt()
    userId: number
}
