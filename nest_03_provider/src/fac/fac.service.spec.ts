import { Test, TestingModule } from '@nestjs/testing';
import { FacService } from './fac.service';

describe('FacService', () => {
  let service: FacService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacService],
    }).compile();

    service = module.get<FacService>(FacService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
