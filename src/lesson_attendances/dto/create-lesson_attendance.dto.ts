import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateLessonAttendanceDto {
    @IsNumber()
    @IsNotEmpty()
    lesson_id: number

    @IsNumber()
    @IsNotEmpty()
    student_id: number

    @IsNotEmpty()
    @IsBoolean()
    attendance_status: boolean

    @IsOptional()
    @IsNumber()
    performance: number
}
