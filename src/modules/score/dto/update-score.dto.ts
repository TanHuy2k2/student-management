import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateScoreDto {
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Max(10)
    @IsOptional()
    attendance: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Max(10)
    @IsOptional()
    midterm: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Max(10)
    @IsOptional()
    final: number;
}
