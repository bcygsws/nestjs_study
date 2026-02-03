import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExcService } from './exc.service';
import { CreateExcDto } from './dto/create-exc.dto';
import { UpdateExcDto } from './dto/update-exc.dto';

@Controller('exc')
export class ExcController {
  constructor(private readonly excService: ExcService) {}

  @Post()
  create(@Body() createExcDto: CreateExcDto) {
    return this.excService.create(createExcDto);
  }

  @Get()
  findAll() {
    return this.excService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.excService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExcDto: UpdateExcDto) {
    return this.excService.update(+id, updateExcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.excService.remove(+id);
  }
}
