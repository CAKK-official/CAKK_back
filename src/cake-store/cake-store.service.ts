import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, Repository } from 'typeorm';
import { StoreEachDto } from './dto/cake-Each.dto';
import { cakeSearchResultDTO } from './dto/cake-searchresult.dto';
import { PictblDummy } from './entities/PictblDummy';
import { Storetbl } from './entities/Storetbl';
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
      return result.slice(skip, end);
    }

    //주소 없고 카테고리만 있을 때
    else if (addresses == null && category != null) {
      const query = await this.pictblRepo
        .createQueryBuilder('pictbl')
        .select([
          'storetbl.id as id',
          'storetbl.name as name',
          'storetbl.address as address',
          `JSON_ARRAYAGG( pictbl.url) as picurl`,
        ])
        .innerJoin('pictbl.store', 'storetbl')
        .where('JSON_CONTAINS(pictbl.category, :category)', {
          category: `"${category}"`,
        })
        .groupBy('id');

      const result = await query.offset(skip).limit(take).getRawMany();

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
      return result.slice(skip, end);
    }
  }

  // id로 가게별 데이터 불러오기
  public async findById(storeId: number): Promise<StoreEachDto[] | any> {
    const data = await getRepository(PictblDummy)
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
      .addSelect('storetbl.views', 'views')
      .addSelect('JSON_ARRAYAGG(pictbl.url)', 'pictArray')
      .addSelect('JSON_ARRAYAGG(pictbl.category)', 'storeCategory')
      .where('storetbl.id = :storeId', { storeId: storeId })
      .getRawMany();

    Logger.log(data);
    return data;
  }

  public async addViews(storeId: number): Promise<any> {
    await getRepository(StoretblDummy)
      .createQueryBuilder('storetbl')
      .update(StoretblDummy)
      .set({
        views: () => 'views + 1',
      })
      .where('id = :storeId', { storeId: storeId })
      .execute();
  }

  // public async findBystoreId(
  //   storeId: number,
  // ): Promise<PictblDummy[] | undefined> {
  //   return this.pictblRepo.find({ storeid: storeId });
  // }

  public async addShares(storeId: number): Promise<any> {
    await getRepository(StoretblDummy)
      .createQueryBuilder('storetbl')
      .update(StoretblDummy)
      .set({
        shares: () => 'shares + 1',
      })
      .where('id = :storeId', { storeId: storeId })
      .execute();
  }
}
