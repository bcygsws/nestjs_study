import { PartialType } from '@nestjs/mapped-types';
import { CreateZhiDto } from './create-zhi.dto';

export class UpdateZhiDto extends PartialType(CreateZhiDto) {}
