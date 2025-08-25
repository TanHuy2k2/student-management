import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateSubjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsOptional()
    updatedBy: number;
}
