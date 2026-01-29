import {Module} from '@nestjs/common';
import {DownloadService} from './download.service';
import {DownloadController} from './download.controller';
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {join, extname} from 'path';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: join(__dirname, '../images'),
                filename: (_, file, cb) => {
                    const fileName = `${new Date().getTime() + extname(file.originalname)}`;// 重新命名上传的图片文件
                    return cb(null, fileName);
                }
            })
        })
    ],
    controllers: [DownloadController],
    providers: [DownloadService],
})
export class DownloadModule {
}
