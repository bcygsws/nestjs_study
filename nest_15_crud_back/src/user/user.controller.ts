import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        console.log('createUserDto===', typeof createUserDto.createdAt)
        return this.userService.create(createUserDto);
    }
    // 查询参数，使用@Query()装饰器
    @Get()
    findAll(@Query('search') search?: string,
            @Query('page', new ParseIntPipe({optional: true})) page: number = 1,
            @Query('limit', new ParseIntPipe({optional: true})) limit: number = 10) {
        console.log(`search===`,search);
        return this.userService.findAll(page, limit, search);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
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
