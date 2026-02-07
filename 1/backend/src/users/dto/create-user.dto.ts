import { IsString, IsEmail, IsOptional, IsInt, Min, Max, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 50, { message: '姓名长度必须在2-50个字符之间' })
  name: string;

  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  email: string;

  @IsOptional()
  @IsString()
  @Length(0, 20, { message: '电话长度不能超过20个字符' })
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(0, 200, { message: '地址长度不能超过200个字符' })
  address?: string;

  @IsOptional()
  @IsInt()
  @Min(0, { message: '年龄不能小于0' })
  @Max(150, { message: '年龄不能大于150' })
  age?: number;

  @IsOptional()
  @IsString()
  @Length(0, 500, { message: '简介长度不能超过500个字符' })
  bio?: string;
}
