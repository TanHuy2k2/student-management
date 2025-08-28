import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateRoomDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsOptional()
    updatedBy: number;
}
