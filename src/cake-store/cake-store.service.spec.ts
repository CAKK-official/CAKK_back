import { Test, TestingModule } from '@nestjs/testing';
import { CakeStoreService } from './cake-store.service';

describe('CakeStoreService', () => {
  let service: CakeStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CakeStoreService],
    }).compile();

    service = module.get<CakeStoreService>(CakeStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
