import { Module } from '@nestjs/common';
import { ExcService } from './exc.service';
import { ExcController } from './exc.controller';

@Module({
  controllers: [ExcController],
  providers: [ExcService],
})
export class ExcModule {}
