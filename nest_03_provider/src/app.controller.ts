import {Controller, Get, Inject} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    // providers的第一种方式：提供别名和类
    constructor(@Inject('APP_SERVICE') private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

}
