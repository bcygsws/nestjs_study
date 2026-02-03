import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from '@nestjs/common';
import {ClassConstructor, plainToClass, plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UserPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        console.log(`value:`, value);
        console.log(`metadata:`, metadata);
        // 一定要对metadata.metatype进行类型断言，否则测试时，报类型匹配错误
        // metadata.metatype是一个ClassConstructor<DTO类名>
        const DTO = plainToInstance(metadata.metatype as ClassConstructor<CreateUserDto>, value);
        console.log(`DTO:`, DTO);
        const err = await validate(DTO);
        console.log(`err:`, err);
        if (err.length > 0) {
            // throw new Error('参数验证失败');
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}
