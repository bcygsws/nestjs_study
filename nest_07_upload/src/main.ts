import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // 设置静态访问目录，两个参数：path,options
    // 此时，托管在根目录静态路径下，图片的路径直接就是join(__dirname, 'images'),无需要在向上../切换一级
    // 示例：在浏览器地址栏输入：http://localhost:3000/xiaoman/++图片名，测试是否访问成功?
    app.useStaticAssets(join(__dirname, 'images'), {
        prefix: '/xiaoman'
    });
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
/**
 * @Desc:上传图片文件并在静态目录中可以访问该上传图片
 * 1.装包
 * npm i multer @types/multer --save
 * @nestjs/platform-express 这个包脚手架默认安装了，不需要额外安装
 *
 * 2.在upload.module.ts中,添加MultipartModule.register({})
 * 指定临时存放图片文件的目录和文件名
 *
 *
 * */
