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
