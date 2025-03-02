import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description: string
}
