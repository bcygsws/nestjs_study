import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {RoleGuard} from "../role/role.guard";
import {ReqUrl, Role} from "../role/role.decorator";

@Controller('user')
@UseGuards(RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * @Desc:使用自定义装饰器
   * nest g d role
   *
   *
   * */
  @Get()
  // @SetMetadata('roles', ['admin'])
  // 自定义装饰器替代setMeatdata()
  @Role('admin')
  findAll(@ReqUrl() reqUrl: string) {
    console.log(`reqUrl:`, reqUrl);
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
