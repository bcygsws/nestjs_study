import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {CommonFilter} from "./common/common.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CommonFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
