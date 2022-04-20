import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoretblDummy } from './entities/StoretblDummy';

@Injectable()
export class CakeStoreService {
  constructor(
    @InjectRepository(StoretblDummy)
    private readonly repository: Repository<StoretblDummy>,
  ) {}

  findAll(): Promise<StoretblDummy[]> {
    return this.repository.find();
  }
}
