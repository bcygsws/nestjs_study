import {Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import {FacService} from './fac.service';
import {CreateFacDto} from './dto/create-fac.dto';
import {UpdateFacDto} from './dto/update-fac.dto';
import {FacService2} from "./fac.service2";

@Controller('fac')
export class FacController {
    constructor(private readonly facService: FacService,
                @Inject('USE_VAL') private readonly arr: string[],
                @Inject('FAC_SERVICE2') private readonly facService2: FacService2,
                @Inject('SYNC') private readonly sync: string,
                @Inject('ASYNC') private readonly async: string
    ) {
    }

    @Get()
    findAll() {
        return this.facService.findAll() + this.arr.toString();// 通过@Inject() 注入该数组值
    }

    // provider节点提供别名（provide的值），通过@Inject() 注入该别名对应的服务
    @Get('fac2')
    getFac2() {
        return this.facService2.getHello();
    }

    @Get('fac1')
    getFac1() {
        return this.sync;

    }

    @Get('async')
    getAsync() {
        return this.async;
    }

    @Post()
    create(@Body() createFacDto: CreateFacDto) {
        return this.facService.create(createFacDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.facService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFacDto: UpdateFacDto) {
        return this.facService.update(+id, updateFacDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.facService.remove(+id);
    }
}
