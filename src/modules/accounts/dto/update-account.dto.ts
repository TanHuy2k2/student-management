import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class UpdateAccountDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsNumber()
    @IsOptional()
    updatedBy: number;
}
