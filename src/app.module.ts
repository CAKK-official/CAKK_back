import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CakeStoreModule } from './cake-store/cake-store.module';
import { Connection } from 'typeorm';
import { CakkDummy } from './cake-store/entities/CakkDummy.entity';
import config from './ormconfig';
@Module({
<<<<<<< HEAD
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'eulieta13!',
      database: 'cakk',
      entities: [cakeStore],
      synchronize: true, // false가 안전함
    }),
    CakeStoreModule,
  ],
=======
  imports: [TypeOrmModule.forRoot(config), CakeStoreModule],
>>>>>>> 7a469d7e8b24b03d718b5c7829b393e75a48cd0d
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
// ('/**/*.entity{.ts,.js}');
