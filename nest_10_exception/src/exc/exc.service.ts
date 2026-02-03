import { Injectable } from '@nestjs/common';
import { CreateExcDto } from './dto/create-exc.dto';
import { UpdateExcDto } from './dto/update-exc.dto';

@Injectable()
export class ExcService {
  create(createExcDto: CreateExcDto) {
    return 'This action adds a new exc';
  }

  findAll() {
    return `This action returns all exc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exc`;
  }

  update(id: number, updateExcDto: UpdateExcDto) {
    return `This action updates a #${id} exc`;
  }

  remove(id: number) {
    return `This action removes a #${id} exc`;
  }
}
