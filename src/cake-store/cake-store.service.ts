import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cakeStore } from './entities/cakestore.entity';

@Injectable()
export class CakeStoreService {
  constructor(
    @InjectRepository(cakeStore)
    private readonly repository: Repository<cakeStore>,
  ) {}

  findAll(): Promise<cakeStore[]> {
    return this.repository.find();
  }
}
