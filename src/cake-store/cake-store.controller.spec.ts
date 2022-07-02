import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CakeStoreController } from './cake-store.controller';
import { CakeStoreService } from './cake-store.service';
import { Pictbl } from './entities/Pictbl';
import { Storetbl } from './entities/Storetbl';

class MockStoreRepository {}
class MockPicRepository {}

describe('CakeStoreController', () => {
  let controller: CakeStoreController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CakeStoreController],
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

    controller = module.get<CakeStoreController>(CakeStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
