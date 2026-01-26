import { Injectable } from '@nestjs/common';
import { CreateZhiDto } from './dto/create-zhi.dto';
import { UpdateZhiDto } from './dto/update-zhi.dto';

@Injectable()
export class ZhiService {
  create(createZhiDto: CreateZhiDto) {
    return 'This action adds a new zhi';
  }

  findAll() {
    return `This action returns all zhi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zhi`;
  }

  update(id: number, updateZhiDto: UpdateZhiDto) {
    return `This action updates a #${id} zhi`;
  }

  remove(id: number) {
    return `This action removes a #${id} zhi`;
  }
}
