import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    NestInterceptor
} from '@nestjs/common';
import {UploadService} from './upload.service';
import {CreateUploadDto} from './dto/create-upload.dto';
import {UpdateUploadDto} from './dto/update-upload.dto';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {
    }

    @Post('album')
    // 客中守拦管,使用请求拦截器
    @UseInterceptors(FileInterceptor('file') as NestInterceptor | Function)//要为FileInterceptor('file')断言，去除警告
    create(@UploadedFile() file) {
        console.log(`file==`, file);
        return `上传成功了`;
    }

    @Get()
    findAll() {
        return this.uploadService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.uploadService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
        return this.uploadService.update(+id, updateUploadDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.uploadService.remove(+id);
    }
}
