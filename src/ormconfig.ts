import { ConnectionOptions } from 'typeorm';
import { CakkDummy } from './cake-store/entities/CakkDummy.entity';

const config: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'ab3670',
  database: 'cakestore',
  entities: [CakkDummy],
  synchronize: false,
};

export = config;
