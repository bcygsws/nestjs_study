import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NestInterceptor,
    UseInterceptors,
    UploadedFile,
    Res
} from '@nestjs/common';
import {DownloadService} from './download.service';
import {CreateDownloadDto} from './dto/create-download.dto';
import {UpdateDownloadDto} from './dto/update-download.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {join} from "path";

// 压缩包中取出zip模块
import {zip} from "compressing";
import {type Response} from "express";

@Controller('download')
export class DownloadController {
    constructor(private readonly downloadService: DownloadService) {
    }

    @Post('album') // 上传图片
    @UseInterceptors(FileInterceptor('file') as NestInterceptor | Function)
    create(@UploadedFile() file: any) {
        console.log(`file==`, file);
        return `上传图片成功`;
    }

    @Get('export')
    findAll(@Res() res) {
        const url = join(__dirname, '../images/1769638493647.png');
        // 第一种下载方式：res.download()
        res.download(url, 'xiaoman.png');
        // res.download(url);
    }

    // 第二种方式：使用compressing包压缩后下载
    // 1.装包compressing:npm i compressing -S
    // 2.新建vite前端项目nest_08_front
    // 3.todo:stream get请求中，如何实时获取上传的图片生成的零时文件名，是存入数据库，再次数据库取图片吗？

    @Get('stream')
    async getSteam(@Res() res: Response) {
        const url = join(__dirname, '../images/1769720523349.jpg');
        const tarStream = new zip.Stream();
        await tarStream.addEntry(url);// 配置流的url
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment;filename=bcy`);

        // 导出压缩后的文件流，通过管道导出；在此之前，需要配置headers
        tarStream.pipe(res);


    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.downloadService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDownloadDto: UpdateDownloadDto) {
        return this.downloadService.update(+id, updateDownloadDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.downloadService.remove(+id);
    }
}
