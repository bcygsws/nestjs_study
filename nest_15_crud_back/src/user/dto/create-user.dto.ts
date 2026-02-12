import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(2, 50, {message: '用户名长度在2-50之间'})
    name: string;

    @IsString()
    @Length(0, 128, {message: '描述长度在0-128之间'})
    desc?: string;

    @IsOptional()
    createdAt?: number | Date;

}
