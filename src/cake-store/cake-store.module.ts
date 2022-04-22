import { Module } from '@nestjs/common';
import { CakeStoreService } from './cake-store.service';
import { CakeStoreController } from './cake-store.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { StoretblDummy } from './entities/StoretblDummy';
import { PictblDummy } from './entities/PictblDummy';

@Module({
  imports: [TypeOrmModule.forFeature([StoretblDummy, PictblDummy])],
  controllers: [CakeStoreController],
  providers: [CakeStoreService],
})
export class CakeStoreModule {}
