import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(2, 20, {message: '用户名长度在2-20之间'})
    name: string;

    @IsString()
    @Length(1, 255, {message: '描述长度在1-255之间'})
    desc?: string;

    @IsOptional()
    createdAt?: any;

}
