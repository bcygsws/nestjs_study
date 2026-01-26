import {Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import {ZhiService} from './zhi.service';
import {CreateZhiDto} from './dto/create-zhi.dto';
import {UpdateZhiDto} from './dto/update-zhi.dto';

@Controller('zhi')
export class ZhiController {
    constructor(private readonly zhiService: ZhiService, @Inject('MY_ARRAY') private readonly arr: string[]) {
    }

    @Post()
    create(@Body() createZhiDto: CreateZhiDto) {
        return this.zhiService.create(createZhiDto);
    }

    @Get()
    findAll() {
        return this.arr;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.zhiService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateZhiDto: UpdateZhiDto) {
        return this.zhiService.update(+id, updateZhiDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.zhiService.remove(+id);
    }
}
