import { Test, TestingModule } from '@nestjs/testing';
import { ExcService } from './exc.service';

describe('ExcService', () => {
  let service: ExcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExcService],
    }).compile();

    service = module.get<ExcService>(ExcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
