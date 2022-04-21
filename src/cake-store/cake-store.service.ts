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

  // id로 가게별 데이터 불러오기
  public async findById(storeId: number): Promise<StoretblDummy | undefined> {
    return this.repository.findOne(storeId);
  }

  // public async findByTag(category: string): Promise<CakeStore | undefined> {
  //   return this.repository.find(category);
  // }
}
