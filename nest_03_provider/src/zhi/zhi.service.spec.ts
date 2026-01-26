import { Test, TestingModule } from '@nestjs/testing';
import { ZhiService } from './zhi.service';

describe('ZhiService', () => {
  let service: ZhiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZhiService],
    }).compile();

    service = module.get<ZhiService>(ZhiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
