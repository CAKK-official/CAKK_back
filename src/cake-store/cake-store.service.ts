import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getRepository, Repository } from 'typeorm';
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
  public async storeSearch(data): Promise<cakeSearchResultDTO[] | any> {
    const addresses =
      data.addresses != 'null' ? JSON.parse(data.addresses) : null;
    const category = data.category != 'null' ? data.category : null;

    //주소만 있을 때
    if (addresses != null && category == null) {
      let result;
      for (let i = 0; i < addresses.length; i++) {
        const tmpresult = await getRepository(StoretblDummy)
          .createQueryBuilder('storetbldummy')
          .select([
            'storetbldummy.id as id',
            'storetbldummy.name as name',
            'JSON_ARRAY(storetbldummy.picture) as picurl',
            'storetbldummy.address as address',
          ])
          .where('storetbldummy.address like :address', {
            address: `%${addresses[i]}%`,
          })
          .getRawMany();
        if (i == 0) result = tmpresult;
        else result.push(tmpresult);
      }
      return result;
    }

    //주소 없고 카테고리만 있을 때
    else if (addresses == null && category != null) {
    }
    //주소 & 카테고리 둘 다 있을 때
    else if (addresses != null && category != null) {
    }
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
