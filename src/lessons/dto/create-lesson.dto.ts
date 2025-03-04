import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLessonDto {
    @IsString()
    @IsOptional()
    title: string

    @IsNumber()
    @IsNotEmpty()
    course_id:number
}
