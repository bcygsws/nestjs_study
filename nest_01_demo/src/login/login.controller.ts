import {Body, Controller, Get, Headers, HttpCode, Param, Post, Query, Request} from '@nestjs/common';
import {LoginService} from "./login.service";

/**
 * @Desc: 获取前端传过来的参数
 * 来自常用包 @nestjs/common
 *
 * @Request()
 * @Response()
 *
 * @Query(key?:string)
 * @Body(key?:string)
 * @Param(key?:string)
 *
 * @Headers() req.headers
 * @Session() req.session
 *
 * @Next()  next
 * @HttpCode()
 *
 *
 * */


@Controller('login')
export class LoginController {
    // 构造器注入
    constructor(private readonly loginService: LoginService) {
    }

    @Post()
    // create(@Body() body: any) {
    //     // 打印body参数
    //     console.log(`body===`, body);
    //     return this.loginService.create(body);
    // }

    create(@Body('name') name: string, @Body('age') age: number) {
        // 打印body参数
        // console.log(`body===`, body);
        console.log(`name===`, name);// name===李红军
        console.log(`age===`, age);// age===23
        return this.loginService.create({name, age});
    }

    @Get()
    // 1.最原始的方式
    // 使用@Request()请求查询参数，需要多一步，识别参数类型，req.query/req.params/req.body
    // findAll(@Request() req: any) {
    //     console.log(`req.query===`, req.query);
    //     return this.loginService.findAll(req.query.name);
    // }


    // 2.最简单的方式
    // findAll(@Query() query: any) {
    //     console.log(`query===`, query);
    //     return this.loginService.findAll(query.name);
    // }

    findAll(@Query('name') name: string) {
        console.log(`name===`, name);
        return this.loginService.findAll(name);
    }

    // 3.使用@Param()获取路径参数
    @Get(':id')// 动态参数
    // @HttpCode(200)// 不适用该装饰器@HttpCode()，则默认就是200
    @HttpCode(208)// apifox请求状态码就由默认的200，变成208了
    find(@Param('id') id: number, @Headers() headers: any) {
        console.log(`id===`, id);
        console.log(`headers===`, headers);
        console.log(`headers.cookie===`, headers.cookie);
        return this.loginService.find(id);
    }


}
