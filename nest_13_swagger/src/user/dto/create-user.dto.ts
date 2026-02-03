import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({description: '用户名', required: true})
    name: string;

    @ApiProperty({description: '年龄', required: true})
    age: number;
}
