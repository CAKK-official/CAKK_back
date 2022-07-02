import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CakeStoreService } from './cake-store.service';
import { Pictbl } from './entities/Pictbl';
import { Storetbl } from './entities/Storetbl';

class MockStoreRepository {}
class MockPicRepository {}

describe('CakeStoreService', () => {
  let service: CakeStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CakeStoreService,
        {
          provide: getRepositoryToken(Storetbl),
          useClass: MockStoreRepository,
        },
        {
          provide: getRepositoryToken(Pictbl),
          useClass: MockPicRepository,
        },
      ],
    }).compile();

    service = module.get<CakeStoreService>(CakeStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('전체 케이크 집 반환', () => {
  //   expect(service.findAll().toBe({}));
  // });
});
