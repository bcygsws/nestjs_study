import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction} from "express";

// 定义了一个局部中间件Logger类，ConfigModule模块消费它
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: any, res: any, next: NextFunction) {
        console.log('我被拦截了...');
        // next();
    }
}
