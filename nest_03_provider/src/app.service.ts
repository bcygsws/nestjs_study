import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World~起别名的provide，注入是需要@Inject(别名)引入';
    }
}
