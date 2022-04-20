import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CakeStore } from 'src/cake-store/entities/CakkDummy.entity';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '비밀번호입력',
  database: 'cakk',
  entities: [CakeStore],
  synchronize: false,
};

export = config;
