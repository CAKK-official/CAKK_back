import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CakeStoreModule } from './cake-store/cake-store.module';
import { Connection } from 'typeorm';
import { CakkDummy } from './cake-store/entities/CakkDummy.entity';
import config from './ormconfig';
@Module({
  imports: [TypeOrmModule.forRoot(config), CakeStoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
// ('/**/*.entity{.ts,.js}');
