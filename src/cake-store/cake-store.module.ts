import { Module } from '@nestjs/common';
import { CakeStoreService } from './cake-store.service';
import { CakeStoreController } from './cake-store.controller';

@Module({
  controllers: [CakeStoreController],
  providers: [CakeStoreService],
})
export class CakeStoreModule {}
