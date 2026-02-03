import { PartialType } from '@nestjs/mapped-types';
import { CreateExcDto } from './create-exc.dto';

export class UpdateExcDto extends PartialType(CreateExcDto) {}
