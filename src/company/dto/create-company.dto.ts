import { IsNotEmpty, IsString, IsEmail, IsUrl, IsInt } from 'class-validator';

export class CreateCompanyDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    image: string;

    @IsNotEmpty()
    @IsInt()
    phone: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsUrl()
    website: string;

    @IsNotEmpty()
    @IsInt()
    userId: number
}
