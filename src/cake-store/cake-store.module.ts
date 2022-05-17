import { Module } from '@nestjs/common';
import { CakeStoreService } from './cake-store.service';
import { CakeStoreController } from './cake-store.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { StoretblDummy } from './entities/StoretblDummy';
import { PictblDummy } from './entities/PictblDummy';
import { Storetbl } from './entities/Storetbl';
import { Pictbl } from './entities/Pictbl';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoretblDummy, PictblDummy, Storetbl, Pictbl]),
  ],
  controllers: [CakeStoreController],
  providers: [CakeStoreService],
})
export class CakeStoreModule {}
