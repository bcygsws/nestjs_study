import { Test, TestingModule } from '@nestjs/testing';
import { ExcController } from './exc.controller';
import { ExcService } from './exc.service';

describe('ExcController', () => {
  let controller: ExcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExcController],
      providers: [ExcService],
    }).compile();

    controller = module.get<ExcController>(ExcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
