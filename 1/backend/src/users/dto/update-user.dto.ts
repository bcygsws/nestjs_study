import { IsString, IsEmail, IsOptional, IsInt, Min, Max, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(150)
  age?: number;
}
