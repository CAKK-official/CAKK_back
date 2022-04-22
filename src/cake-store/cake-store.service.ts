import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { cakeSearchResultDTO } from './dto/cake-searchresult.dto';
import { PictblDummy } from './entities/PictblDummy';
import { StoretblDummy } from './entities/StoretblDummy';

@Injectable()
export class CakeStoreService {
  constructor(
    @InjectRepository(StoretblDummy)
    private readonly storeblRepo: Repository<StoretblDummy>,
    @InjectRepository(PictblDummy)
    private readonly pictblRepo: Repository<PictblDummy>,
  ) {}

  public async findAll(): Promise<StoretblDummy[] | undefined> {
    return this.storeblRepo.find();
  }

  //가게 검색
  public async storeSearch(data): Promise<cakeSearchResultDTO[] | undefined> {
    // let address = data.address;
    // let category = data.category;
    return data;
  }

  // id로 가게별 데이터 불러오기
  public async findById(storeId: number): Promise<StoretblDummy | undefined> {
    return this.storeblRepo.findOne(storeId);
  }

  public async findBystoreId(
    storeId: number,
  ): Promise<PictblDummy[] | undefined> {
    return this.pictblRepo.find({ storeid: storeId });
  }
  // public async findByTag(category: string): Promise<CakeStore | undefined> {
  //   return this.StoreblRepo.find(category);
  // }
}
