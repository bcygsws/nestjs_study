import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {map, Observable} from 'rxjs';

interface Data<T> {
    data: T;
}

@Injectable()
export class ItcInterceptor<T> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
        return next.handle().pipe(map(data => {
            console.log('我是拦截器...', data);
            return {
                status: 0,
                code: 200,
                success: true,
                data
            }
        }));
    }
}
