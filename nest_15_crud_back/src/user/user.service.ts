import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Like, Repository} from "typeorm";
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private user: Repository<User>) {
    }

    async create(createUserDto: CreateUserDto) {
        const usr = await this.user.create(createUserDto);
        return this.user.save(usr);
    }

    async findAll(page: number = 1, limit: number = 10, search?: string) {
        const whereSQL = search ? [
            {name: Like(`%${search}%`)},
            {desc: Like(`%${search}%`)}
        ] : {};
        // findAndCount请求数据示例：[[{...},{...},...],4]
        const [data, total] = await this.user.findAndCount({
            where: whereSQL,
            skip: (page - 1) * limit,
            take: limit,
            order: {id: 'DESC'}
        });

        return {
            data,
            total,
            page,
            limit
        };
    }

    findOne(id: number): Promise<User> {
        const usr= this.user.findOneBy({id});
        if (!usr){
            throw new NotFoundException(`用户ID为${id}的用户不存在`)
        }
        return usr;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        // 方式一：update(id,updateUserDto)
        // return this.user.update(id, updateUserDto);
        // 方式二：先根据id查询数据，再进行更新
        const usr = await this.findOne(id);
        Object.assign(usr, updateUserDto);
        return this.user.save(usr);

    }

    remove(id: number) {
        return this.user.delete(id);
    }
}
