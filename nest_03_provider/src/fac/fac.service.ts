import { Injectable } from '@nestjs/common';
import { CreateFacDto } from './dto/create-fac.dto';
import { UpdateFacDto } from './dto/update-fac.dto';

@Injectable()
export class FacService {
  create(createFacDto: CreateFacDto) {
    return 'This action adds a new fac';
  }

  findAll() {
    return `This action returns all fac`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fac`;
  }

  update(id: number, updateFacDto: UpdateFacDto) {
    return `This action updates a #${id} fac`;
  }

  remove(id: number) {
    return `This action removes a #${id} fac`;
  }
}
