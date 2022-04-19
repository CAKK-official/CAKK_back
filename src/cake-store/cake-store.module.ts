import { Module } from '@nestjs/common';
import { CakeStoreService } from './cake-store.service';
import { CakeStoreController } from './cake-store.controller';
import { CakeStore } from './entities/CakkDummy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CakeStore])],
  controllers: [CakeStoreController],
  providers: [CakeStoreService],
})
export class CakeStoreModule {}
