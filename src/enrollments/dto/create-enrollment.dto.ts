import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateEnrollmentDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number

    @IsNumber()
    @IsNotEmpty()
    course_id: number
}
