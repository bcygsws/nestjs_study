import { PartialType } from '@nestjs/mapped-types';
import { CreateFacDto } from './create-fac.dto';

export class UpdateFacDto extends PartialType(CreateFacDto) {}
