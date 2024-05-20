import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateOfferDto {

    @IsNotEmpty()
    @IsString()
    job: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsNumber()
    companyId: number;
}
