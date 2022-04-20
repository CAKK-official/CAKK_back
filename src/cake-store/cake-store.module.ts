import { Module } from '@nestjs/common';
import { CakeStoreService } from './cake-store.service';
import { CakeStoreController } from './cake-store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoretblDummy } from './entities/StoretblDummy';

@Module({
  imports: [TypeOrmModule.forFeature([StoretblDummy])],
  controllers: [CakeStoreController],
  providers: [CakeStoreService],
})
export class CakeStoreModule {}
