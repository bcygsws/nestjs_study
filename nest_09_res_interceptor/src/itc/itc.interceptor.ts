import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {map, Observable} from 'rxjs';

interface data<T> {
    data: T;
}

@Injectable()
export class ItcInterceptor<T = any> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<data<T>> {
        return next.handle().pipe(map(data => {
            return {
                status: 0,
                code: 200,
                success: true,
                data
            }
        }));
    }
}
