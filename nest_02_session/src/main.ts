import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import  session from 'express-session';
import cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 方式一：跨域处理
    // app.enableCors();
    // 方式二：使用第三方库cors实现跨域
    app.use(cors());
    // 注册并配置session
    // 每次请求都强行设置cookie，并重置cookie的过期时间（默认false）
    app.use(session({
        secret: 'XiaoMan', name: "XiaoMan.sid", rolling: true, cookie: {maxAge: undefined}
    }));

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();


/**
 * @Desc:一、Session的使用和后端接口设计
 * 步骤：https://xiaoman.blog.csdn.net/article/details/126327047
 * 参考文档：https://blog.csdn.net/weixin_44492275/article/details/108580395
 *
 * 1.1 生成session模块
 * nest g mo session
 *
 * 1.2 装包express-session和类型文件
 * npm i express-session -S
 * npm i @types/express-session -D
 *
 * 1.3 在app.use()中注册session
 * 1.4
 *
 * 二、创建前端项目
 * npm create vite@latest  02_session_front -- --template vue-ts
 *
 * 5.安装前端UI框架element-plus,并依据前端官网进行配置
 * npm i element-plus -S
 * 选择 按需导入 ，参考https://element-plus.org/zh-CN/guide/quickstart
 * 6.在vite.config.ts配置路径映射，和对SCSS的支持（sass@1.78.0之前的版本呢）
 *
 *
 *
 *
 *
 * */
