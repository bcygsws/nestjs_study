import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();


// 演示rxjs
/**
 * @Rxjs的妙用
 * Rxjs：用来编写异步队列和事件处理
 * Observable：可观察的物体
 * Subscription：监听Observable
 * Operator：操作符 map filter reduce concat等等
 *
 *
 * 在@nestjs/cli脚手架项目中，已经引入了rxjs，可以利用rxjs的pipeable操作符，对数据进行pipeable操作
 * 此处，没有创建nestjs项目，只测试rxjs这个包的用法
 *
 *
 * */

import {filter, fromEvent, interval, map, Observable, of} from 'rxjs';

// 用法1
// const observable = new Observable(subscriber => {
//     subscriber.next(1);
//     subscriber.next(2);
//     subscriber.next(3);
//     // 数字4间隔1s后才输出
//     setTimeout(() => {
//         subscriber.next(4);
//         subscriber.complete();
//     }, 1000);
// });

// 监听订阅的值
// observable.subscribe(value => console.log(value));


// 用法2
// const subs = interval(500)
//     .pipe(map(val => ({// 管道pipe内有map和filter两个操作符
//         num: val
//     })), filter(val => val.num % 2 === 0)).subscribe(value => {
//         console.log(value)
//         if (value.num === 10) {
//             subs.unsubscribe();
//         }
//     });

const subs = of(0,1,2,3,4,5)
    .pipe(map(val => ({// 管道pipe内有map和filter两个操作符
        num: val
    })), filter(val => val.num % 2 === 0)).subscribe(value => {
        console.log(value)
        if (value.num === 10) {
            subs.unsubscribe();
        }
    });
// 案例3
// rxjs也可以操作dom,但是nestjs已经不用了，在Vue或者React框架中仍然使用
// const dom = fromEvent(document, 'click').pipe(map(e => e.target));
// dom.subscribe(
//     value => {
//         console.log(value);
//     });

