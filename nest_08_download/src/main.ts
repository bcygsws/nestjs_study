import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 解决跨域问题
    app.use(cors());
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

/**
 * @Desc:nestjs中图片下载的两种方式
 *
 * 1.下载图片文件，得先上传图片，将nest_07_upload\src\upload\upload.controller.ts中上传图片操作，重新做一遍
 * 1.1 装包
 * npm i multer @types/multer -S
 * @nestjs/platform-express包开箱的空项目，已经默认安装过了
 *
 *
 *
 * 2.然后才是下载图片
 *
 *
 *
 *
 * */
