import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Pictbl } from 'src/cake-store/entities/Pictbl';
import { PictblDummy } from 'src/cake-store/entities/PictblDummy';
import { Storetbl } from 'src/cake-store/entities/Storetbl';
import { StoretblDummy } from 'src/cake-store/entities/StoretblDummy';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env' });
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Storetbl, StoretblDummy, Pictbl, PictblDummy],
  synchronize: false,
  keepConnectionAlive: true,
};

export = config;
