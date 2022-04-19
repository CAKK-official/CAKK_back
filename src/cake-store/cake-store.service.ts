import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CakeStore } from './entities/CakkDummy.entity';

@Injectable()
export class CakeStoreService {
  constructor(
    @InjectRepository(CakeStore)
    private readonly repository: Repository<CakeStore>,
  ) {}

  findAll(): Promise<CakeStore[]> {
    return this.repository.find();
  }
}
