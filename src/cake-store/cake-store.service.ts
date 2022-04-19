import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CakkDummy } from './entities/CakkDummy.entity';

@Injectable()
export class CakeStoreService {
  constructor(
    @InjectRepository(CakkDummy)
    private readonly repository: Repository<CakkDummy>,
  ) {}

  findAll(): Promise<CakkDummy[]> {
    return this.repository.find();
  }
}
