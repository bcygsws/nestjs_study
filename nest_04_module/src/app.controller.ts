import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {UserService} from "./user/user.service";

/**
 * @Desc:模块的用法
 * 1.app.controller文件中，直接注入UserService类可以吗？
 * 不可以，报错：Please make sure that the argument UserService at index [1] is available in the AppModule context.
 *
 * 解决：
 * 在user.module.ts文件中，将UserService类使用exports关键字导出一下，使其成为共享类，然后app模块中才可以正常使用
 *
 * 2.全局模块
 * 在模块文件上方使用@Global()，虽然是全局的装饰器，也依然需要导出服务
 * exports:[]
 *
 * 举例：config模块成为一个全局模块，那么user、person模块里都可以使用config模块里的服务了，这就是全局的好处
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * */

@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly userService: UserService) {

    }

    @Get()
    getHello(): string {
        // return this.appService.getHello();
        return this.userService.findAll();
    }
}
