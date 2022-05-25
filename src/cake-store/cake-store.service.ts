import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, Repository } from 'typeorm';
import { StoreEachDto } from './dto/cake-Each.dto';
import { cakeSearchResultDTO } from './dto/cake-searchresult.dto';
import { Pictbl } from './entities/Pictbl';
import { Storetbl } from './entities/Storetbl';

@Injectable()
export class CakeStoreService {
  constructor(
    @InjectRepository(Storetbl)
    private readonly storeblRepo: Repository<Storetbl>,
    @InjectRepository(Pictbl)
    private readonly pictblRepo: Repository<Pictbl>,
  ) {}

  public async findAll(): Promise<Storetbl[] | undefined> {
    return this.storeblRepo.find();
  }

  //인기 케이크 가게 검색(3개)
  public async popularStoreSearch(): Promise<any> {
    const result = await getRepository(Storetbl)
      .createQueryBuilder('storetbl')
      .select([
        'id',
        'name',
        'JSON_ARRAY(picture) as picurl',
        'address',
        '(shares + views) as score',
      ])
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
        const tmpresult = await getRepository(Storetbl)
          .createQueryBuilder('storetbl')
          .select(['id', 'name', 'JSON_ARRAY(picture) as picurl', 'address'])
          .orderBy('id', 'ASC')
          .where('storetbl.address like :address', {
            address: `%${addresses[i]}%`,
          })
          .getRawMany();
        if (i == 0) result = tmpresult;
        else result = result.concat(tmpresult);
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
        const tmpresult = await getRepository(Pictbl)
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
        else result = result.concat(tmpresult);
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

  public async findById(storeId: number): Promise<StoreEachDto[] | any> {
    const data = await getRepository(Pictbl)
      .createQueryBuilder('pictbl')
      .innerJoinAndSelect('pictbl.store', 'storetbl')
      .select('storetbl.id', 'id')
      .addSelect('storetbl.name', 'name')
      .addSelect('storetbl.address ', 'address')
      .addSelect('storetbl.tel', 'tel')
      .addSelect('storetbl.notice ', 'notice')
      .addSelect('storetbl.url', 'url')
      .addSelect('storetbl.menu', 'menu')
      .addSelect('storetbl.beforebuy', 'beforebuy')
      .addSelect('storetbl.afterbuy', 'afterbuy')
      .addSelect('storetbl.whenbuy', 'whenbuy')
      .addSelect('storetbl.opened', 'opend')
      .addSelect('storetbl.closed', 'closed')
      .addSelect('storetbl.latlng', 'latlng')
      .addSelect('JSON_ARRAYAGG(pictbl.url)', 'pictArray')
      .addSelect('JSON_ARRAYAGG(pictbl.category)', 'storeCategory')
      .where('storetbl.id = :storeId', { storeId: storeId })
      .getRawMany();
    return data;
  }

  public async addViews(storeId: number): Promise<any> {
    await getRepository(Storetbl)
      .createQueryBuilder('storetbl')
      .update(Storetbl)
      .set({
        views: () => 'views + 1',
      })
      .where('id = :storeId', { storeId: storeId })
      .execute();
  }

  // public async findBystoreId(
  //   storeId: number,
  // ): Promise<Pictbl[] | undefined> {
  //   return this.pictblRepo.find({ storeid: storeId });
  // }

  public async addShares(storeId: number): Promise<any> {
    await getRepository(Storetbl)
      .createQueryBuilder('storetbl')
      .update(Storetbl)
      .set({
        shares: () => 'shares + 1',
      })
      .where('id = :storeId', { storeId: storeId })
      .execute();
  }
}
