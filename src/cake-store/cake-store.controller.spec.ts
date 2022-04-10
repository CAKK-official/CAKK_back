import { Test, TestingModule } from '@nestjs/testing';
import { CakeStoreController } from './cake-store.controller';
import { CakeStoreService } from './cake-store.service';

describe('CakeStoreController', () => {
  let controller: CakeStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CakeStoreController],
      providers: [CakeStoreService],
    }).compile();

    controller = module.get<CakeStoreController>(CakeStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
