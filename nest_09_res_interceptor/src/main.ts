import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ItcInterceptor} from "./itc/itc.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new ItcInterceptor());
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
/**
 * @Desc:拦截器
 * 是受AOP-面向切面编程技术的启发
 *
 * 拦截器的功能：
 * 在函数执行之前或之后绑定逻辑
 * 对响应的结果进行转换
 * 对抛出的异常进行转换
 * 扩展基本函数行为
 * 根据所选条件完全重写函数（例如：缓存目的）
 *
 *
 *
 * */
