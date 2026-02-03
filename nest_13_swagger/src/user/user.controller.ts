import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {RoleGuard} from "../role/role.guard";
import {ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('user')
@UseGuards(RoleGuard)
@ApiTags('守卫')// 添加一套接口的名字，用以分组
@ApiBearerAuth() // 需要token才能访问接口
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    @SetMetadata('roles', ['admin'])
    @ApiOperation({summary: '验证用户角色是否为admin', description: '只有admin角色才能访问此接口'})
    @ApiQuery({name: 'roles', description: '查询参数'})
    @ApiResponse({status:403, description: '自定义返回数据'})
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @ApiParam({name: 'id', description: '用户id', required: true})
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
