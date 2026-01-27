import {DynamicModule, Module} from '@nestjs/common';
import {UploadService} from './upload.service';
import {UploadController} from './upload.controller';
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {join, extname} from 'path';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: join(__dirname, '../images'),// 临时存放上传图片的路径，dist中和upload文件夹同级是./images路径
                filename: (_, file, cb) => {
                    // 时间戳+文件的后缀，组成上传临时文件的全名
                    const fileName = `${new Date().getTime() + extname(file.originalname)}`;
                    return cb(null, fileName);
                }
            })
        })
    ],
    controllers: [
        UploadController,

    ],
    providers: [UploadService],
})
export class UploadModule {
}
