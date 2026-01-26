import { PartialType } from '@nestjs/mapped-types';
import { CreateLeiDto } from './create-lei.dto';

export class UpdateLeiDto extends PartialType(CreateLeiDto) {}
