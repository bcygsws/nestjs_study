import { Injectable } from '@nestjs/common';
import { CreateLeiDto } from './dto/create-lei.dto';
import { UpdateLeiDto } from './dto/update-lei.dto';

@Injectable()
export class LeiService {
  create(createLeiDto: CreateLeiDto) {
    return 'This action adds a new lei';
  }

  findAll() {
    return `This action returns all lei`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lei`;
  }

  update(id: number, updateLeiDto: UpdateLeiDto) {
    return `This action updates a #${id} lei`;
  }

  remove(id: number) {
    return `This action removes a #${id} lei`;
  }
}
