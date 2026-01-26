import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import cors from 'cors';
// 第二大类：全局中间件，是一个函数，接收3个参数，还是局部中间件那三个
const whiteList = ['/login'];

/**
 * @Desc: 全局中间件
 * 在baidu.com页面的浏览器控制台上，测试第三方中间件cors是否起作用
 * fetch('http://localhost:3000/login').then(res=>res.json()).then(result=>{console.log(result);})
 * fetch('http://localhost:3000/user').then(res=>res.json()).then(result=>{console.log(result);})
 *
 * */
function GlobalMiddleware(req, res, next) {
    console.log('全局中间件');
    // console.log(`req===`, req);
    if (whiteList.includes(req.originalUrl)) {
        next();
    } else {
        res.send({message: '终于露出鸡脚了~'});
    }
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    /**
     * @Desc: 全局中间件之第三方中间件cors
     * 第三大类，第三方中间件，熟记第三方cors实现跨域，这个全局中间件
     * 1.装包cors: npm i cors @types/cors --save   2.在app中注册
     * 2.跨域中间件的注册，要在所有其他全局中间件之前注册---重点
     *
     * */
    app.use(cors());
    // 注册全局中间件
    app.use(GlobalMiddleware);
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
