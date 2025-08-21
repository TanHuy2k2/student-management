import { IsString, IsEnum, IsNotEmpty, IsEmail, MinLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { Role } from 'src/commons/enums/role.enum';

export class CreateAccountsDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Matches(/^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9])/, { message: 'Password must contain at least 1 letter and 1 special character' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsEnum(Role)
    @IsOptional()
    roles: Role;

    @IsNumber()
    @IsOptional()
    createdBy: number;

    @IsNumber()
    @IsOptional()
    updatedBy: number;
}
