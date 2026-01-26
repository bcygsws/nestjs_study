import { Test, TestingModule } from '@nestjs/testing';
import { ZhiController } from './zhi.controller';
import { ZhiService } from './zhi.service';

describe('ZhiController', () => {
  let controller: ZhiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZhiController],
      providers: [ZhiService],
    }).compile();

    controller = module.get<ZhiController>(ZhiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
