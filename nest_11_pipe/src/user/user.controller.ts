import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    ValidationPipe,
    UseGuards
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import * as uuid from 'uuid';
import {UserPipe} from "./user.pipe";
import {ValidationError} from "class-validator";

console.log(uuid.v4());

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    // 1.自己写的局部管道UserPipe
    create(@Body(UserPipe) createUserDto: CreateUserDto) {
        // 2.在main.ts使用app.useGlobalPipes(new ValidationPipe())配置全局管道，此时就不需要自己写管道文件user.pipe.ts了
        // create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    // localhost:3000/user/12342ab
    // id不使用uuid值，而是其他字符，请求后报错：{"message":"Validation failed (uuid is expected)","error":"Bad Request","statusCode":400}

    // localhost:3000/user/e0b16c79-88fd-48d8-b675-2c159aa9ae35
    // 使用一个上面打印的uuid值，请求成功


    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        console.log(`id类型===`, typeof id);
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
