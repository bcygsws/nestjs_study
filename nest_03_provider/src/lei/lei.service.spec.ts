import { Test, TestingModule } from '@nestjs/testing';
import { LeiService } from './lei.service';

describe('LeiService', () => {
  let service: LeiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeiService],
    }).compile();

    service = module.get<LeiService>(LeiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
