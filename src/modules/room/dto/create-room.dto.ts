import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsOptional()
    createdBy: number;

    @IsNumber()
    @IsOptional()
    updatedBy: number;
}
