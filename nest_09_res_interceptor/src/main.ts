import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ItcInterceptor} from "./itc/itc.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new ItcInterceptor());
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
