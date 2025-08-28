import { IsNotEmpty, IsNumber } from 'class-validator';

export class ScoreDto {
    @IsNumber()
    @IsNotEmpty()
    subjectId: number;
}
