import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcModule } from './exc/exc.module';

@Module({
  imports: [ExcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
