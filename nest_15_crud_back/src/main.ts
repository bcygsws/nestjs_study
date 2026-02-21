import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 使用全局管道，验证参数
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    // 启用cors方案实现跨域
    app.enableCors({
        origin: ['*'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true
    });
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();


/**
 * @Desc:Typeorm中文文档
 * 参考：https://typeorm.bootcss.com/tree-entities
 * @Author: bao Chengyi
 *
 * 树形实体： Closure Table ---闭包表和adjacency List---邻接表
 * 参考：https://cloud.tencent.com/developer/article/1016609
 * 一、方式一：闭包表
 * 优点：在处理树形结构的关系时，很方便
 * 缺点：数据存储量大，索引表需要空间大，添加或者删除数据是，操作麻烦
 * 使用场景：
 * 适用于树形结构深度不大，增删操作不频繁的场景
 *
 * 二、方式二：数据枚举法:
 * 
 *
 *
 *
 *
 *
 * */