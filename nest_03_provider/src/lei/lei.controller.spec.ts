import { Test, TestingModule } from '@nestjs/testing';
import { LeiController } from './lei.controller';
import { LeiService } from './lei.service';

describe('LeiController', () => {
  let controller: LeiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeiController],
      providers: [LeiService],
    }).compile();

    controller = module.get<LeiController>(LeiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
