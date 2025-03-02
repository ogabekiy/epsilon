import { IsDate, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description: string

    @IsNumber()
    @IsNotEmpty()
    teacher_id: number

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    category_id: number

    @IsDate()
    @IsOptional()
    start_date: Date

    @IsDate()
    @IsOptional()
    end_date: Date

    @IsString()
    @IsOptional()
    @IsIn(['pending','active','completed'],{message:  'status must be either pending, active, or completed'})
    status: string

    @IsNumber()
    @IsNotEmpty()
    room_id: number

    @IsString()
    @IsNotEmpty()
    start_time: string

    @IsString()
    @IsNotEmpty()
    end_time: string

    @IsString()
    @IsNotEmpty()
    @IsIn(['even','odd'],{message: 'days must be either even or odd'})
    days: string

    
}
