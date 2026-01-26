import { Module } from '@nestjs/common';
import { LeiService } from './lei.service';
import { LeiController } from './lei.controller';

@Module({
  controllers: [LeiController],
  providers: [LeiService],
})
export class LeiModule {}
