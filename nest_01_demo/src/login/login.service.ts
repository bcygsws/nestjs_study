import {Injectable} from '@nestjs/common';

@Injectable()
export class LoginService {
    create(body: any) {
        return `This action adds a new login ${body.name}=${body.age}`;
    }

    findAll(name: string) {
        return `${name}`;
    }

    find(id: number){
        return `This action returns all login ${id}`;
    }
}
