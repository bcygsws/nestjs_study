import {Controller, Get, Post, Body, Patch, Param, Delete, Version} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')

// 1.则代表user模块中，路径为/user的路由，路由请求地址：/user变成/v1/user；其他模块不受影响
// 2.类似作用域一样，在@Controller中添加的version版本后，统一作用于该板块
// @Controller({
//   path: 'user',
//   version: '1'
// })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  // 3.在方法上添加的version版本后，只对该方法有效
  // @Version('1')

  // 4.全局控制版本号，在main.ts文件中处理

  findAll() {
    return this.userService.findAll();
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
