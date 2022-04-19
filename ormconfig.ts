import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PictblDummy } from 'src/cake-store/entities/PictblDummy';
import { StoretblDummy } from 'src/cake-store/entities/StoretblDummy';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'ab3670',
  database: 'cakk',
  entities: [StoretblDummy, PictblDummy],
  synchronize: false,
  keepConnectionAlive: true,
};

export = config;
