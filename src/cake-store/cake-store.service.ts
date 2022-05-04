import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
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

  //인기 케이크 가게 검색(3개)
  public async popularStoreSearch(): Promise<any> {
    const result = await getRepository(StoretblDummy)
      .createQueryBuilder('storetbl')
      .select(['id', 'name', 'picture', 'address', '(shares + views) as score'])
      .orderBy('score', 'DESC')
      .limit(3)
      .getRawMany();

    return result;
  }
  //가게 검색
  public async storeSearch(page, data): Promise<cakeSearchResultDTO[] | any> {
    const addresses =
      data.addresses != 'null' ? JSON.parse(data.addresses) : null;
    const category = data.category != 'null' ? data.category : null;

    console.log(page);
    const take = 9;
    const pages = page || 1;
    const skip = (pages - 1) * take;

    //주소만 있을 때
    if (addresses != null && category == null) {
      let result;
      for (let i = 0; i < addresses.length; i++) {
        const tmpresult = await getRepository(StoretblDummy)
          .createQueryBuilder('storetbl')
          .select(['id', 'name', 'JSON_ARRAY(picture) as picurl', 'address'])
          .orderBy('id', 'ASC')
          .where('storetbl.address like :address', {
            address: `%${addresses[i]}%`,
          })
          .getRawMany();
        if (i == 0) result = tmpresult;
        else result.push(tmpresult);
      }
      const end = Math.min(skip + take, result.length);
      return {
        page: page,
        totalpage: Math.ceil(result.length / 9),
        data: result.slice(skip, end),
      };
    }

    //주소 없고 카테고리만 있을 때
    else if (addresses == null && category != null) {
      const query = await this.pictblRepo
        .createQueryBuilder('pictbl')
        .select([
          'storetbl.id as id',
          'storetbl.name as name',
          'storetbl.address as address',
          `JSON_ARRAYAGG(pictbl.url) as picurl`,
        ])
        .innerJoin('pictbl.store', 'storetbl')
        .where('JSON_CONTAINS(pictbl.category, :category)', {
          category: `"${category}"`,
        })
        .groupBy('id');

      const tmpresult = await query.getRawMany();
      const end = Math.min(skip + take, tmpresult.length);

      const result = {
        page: page,
        totalpage: Math.ceil(tmpresult.length / 9),
        data: tmpresult.slice(skip, end),
      };
      return result;
    }

    //주소 & 카테고리 둘 다 있을 때
    else if (addresses != null && category != null) {
      let result;
      for (let i = 0; i < addresses.length; i++) {
        const tmpresult = await getRepository(PictblDummy)
          .createQueryBuilder('pictbl')
          .innerJoin('pictbl.store', 'storetbl')
          .select([
            'storetbl.id as id',
            'storetbl.name as name',
            'storetbl.address as address',
            'JSON_ARRAYAGG(pictbl.url) as picurl',
            // 'category as category',
          ])
          .where('address LIKE :address', {
            address: `%${addresses[i]}%`,
          })
          .andWhere('JSON_CONTAINS(pictbl.category, :category)', {
            category: `"${category}"`,
          })
          .groupBy('id')
          .getRawMany();

        if (i == 0) result = tmpresult;
        else result.push(tmpresult);
      }

      const end = Math.min(skip + take, result.length);
      return {
        page: page,
        totalpage: Math.ceil(result.length / 9),
        data: result.slice(skip, end),
      };
    }
  }

  // id로 가게별 데이터 불러오기
  public async findById(storeId: number): Promise<StoretblDummy | undefined> {
    const data = await this.storeblRepo.findOne(storeId);
    data.views = data.views + 1;
    const newData = await this.storeblRepo.save(data);
    Logger.log(newData);
    return newData;
  }

  public async findBystoreId(
    storeId: number,
  ): Promise<PictblDummy[] | undefined> {
    return this.pictblRepo.find({ storeid: storeId });
  }

  public async addShares(storeId: number): Promise<StoretblDummy | undefined> {
    const data = await this.storeblRepo.findOne(storeId);
    data.shares = data.shares + 1;
    const newData = await this.storeblRepo.save(data);
    Logger.log(newData);
    return newData;
  }

  // public async findByTag(category: string): Promise<CakeStore | undefined> {
  //   return this.StoreblRepo.find(category);
  // }
}
