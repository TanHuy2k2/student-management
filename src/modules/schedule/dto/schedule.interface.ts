import { IsEnum, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { DayOfWeek } from 'src/commons/enums/day.enum';

export class ScheduleDto {
    @IsNumber()
    @IsOptional()
    studentId: number;

    @IsNumber()
    @IsOptional()
    subjectId: number;

    @IsNumber()
    @IsOptional()
    teacherId: number;

    @IsNumber()
    @IsOptional()
    roomId: number;

    @IsEnum(DayOfWeek)
    @IsOptional()
    dayOfWeek: DayOfWeek;

    @IsString()
    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'startTime must be in HH:mm:ss format',
    })
    startTime: string;

    @IsString()
    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'endTime must be in HH:mm:ss format',
    })
    endTime: string;
}
