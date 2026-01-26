import {Injectable} from '@nestjs/common';
import {CreateLoginDto} from './dto/create-login.dto';
import {UpdateLoginDto} from './dto/update-login.dto';

@Injectable()
export class LoginService {
    create(createLoginDto: CreateLoginDto) {
        return 'This action adds a new login';
    }

    findAll() {
        return {
            message: 'This action returns all login',
            success: true
        };
    }

    findOne(id: number) {
        return {
            message: `This action returns a #${id} login`,
            success: true
        };
    }

    update(id: number, updateLoginDto: UpdateLoginDto) {
        return `This action updates a #${id} login`;
    }

    remove(id: number) {
        return `This action removes a #${id} login`;
    }
}
