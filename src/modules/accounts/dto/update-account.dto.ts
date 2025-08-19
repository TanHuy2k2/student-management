import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateAccountsDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    image: string;
}
