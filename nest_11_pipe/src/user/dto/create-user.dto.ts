import {IsNotEmpty, IsNumber, IsString, Length,} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 18)
    name: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;
}
