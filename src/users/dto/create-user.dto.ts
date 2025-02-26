import { Transform, Type } from "class-transformer";
import { 
    IsNotEmpty, 
    IsString, 
    IsBoolean, 
    IsIn, 
    IsOptional, 
    Matches, 
    IsDate,
    IsNumber,
} from "class-validator";

export class CreateUserDto {

    @IsOptional()
    @IsNumber()
    hh_id: number

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{9}$/, { message: "Telefon raqami faqat 9 ta raqamdan iborat bo‘lishi kerak." })
    phone_number: string;

    @IsString()
    @IsOptional()
    @Matches(/^\d{9}$/, { message: "Qo‘shimcha telefon raqami faqat 9 ta raqamdan iborat bo‘lishi kerak." })
    extra_phone_number?: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional() 
    @IsIn(['user', 'teacher', 'admin'], { message: "Role faqat user, admin yoki teacher bo‘lishi mumkin." })
    @Transform(({ value }) => value || 'user') 
    role?: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;

    @IsDate()
    @IsOptional()
    @Type(() => Date) 
    birthday?: Date;

    @IsString()
    @IsNotEmpty()
    @IsIn(['male', 'female'], { message: "Gender faqat 'male' yoki 'female' bo‘lishi kerak." })
    gender?: string;

    @IsString()
    @IsOptional()
    profile_photo?: string;
}
