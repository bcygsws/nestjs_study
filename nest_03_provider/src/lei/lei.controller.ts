import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeiService } from './lei.service';
import { CreateLeiDto } from './dto/create-lei.dto';
import { UpdateLeiDto } from './dto/update-lei.dto';

@Controller('lei')
export class LeiController {
  constructor(private readonly leiService: LeiService) {}

  @Post()
  create(@Body() createLeiDto: CreateLeiDto) {
    return this.leiService.create(createLeiDto);
  }

  @Get()
  findAll() {
    return this.leiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeiDto: UpdateLeiDto) {
    return this.leiService.update(+id, updateLeiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leiService.remove(+id);
  }
}
