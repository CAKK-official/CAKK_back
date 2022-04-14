import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CakeStoreModule } from './cake-store/cake-store.module';
import { Connection } from 'typeorm';
import { CakkDummy } from './cake-store/entities/CakkDummy.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ab3670',
      database: 'cakestore',
      entities: [CakkDummy],
      synchronize: false, // false가 안전함
    }),
    CakeStoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
// ('/**/*.entity{.ts,.js}');
