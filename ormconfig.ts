import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CakeStore } from 'src/cake-store/entities/CakkDummy.entity';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // username: 'cakk',
  // password: 'nestjshi123!',
  // database: 'cakk',
  entities: [CakeStore],
  synchronize: false,
};

export = config;
