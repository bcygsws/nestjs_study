import { Test, TestingModule } from '@nestjs/testing';
import { FacController } from './fac.controller';
import { FacService } from './fac.service';

describe('FacController', () => {
  let controller: FacController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacController],
      providers: [FacService],
    }).compile();

    controller = module.get<FacController>(FacController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
