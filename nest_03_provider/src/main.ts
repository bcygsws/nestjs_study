import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


/**
 * @Desc:providers的几种方式：
 * 1.类 lei
 * 2.值 zhi
 * 3.工厂函数 fac
 *
 * */
