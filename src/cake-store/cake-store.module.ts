import { Module } from '@nestjs/common';
import { CakeStoreService } from './cake-store.service';
import { CakeStoreController } from './cake-store.controller';
import { cakeStore } from './entities/cakestore.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([cakeStore])],
  controllers: [CakeStoreController],
  providers: [CakeStoreService],
})
export class CakeStoreModule {}
