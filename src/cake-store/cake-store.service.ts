import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
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
      .select(['id', 'name', 'JSON_ARRAY(picture) as picurl', 'address'])
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
  public async findById(storeId: number): Promise<Storetbl | undefined> {
    return this.storeblRepo.findOne(storeId);
  }

  public async findBystoreId(storeId: number): Promise<Pictbl[] | undefined> {
    return this.pictblRepo.find({ storeid: storeId });
  }
  // public async findByTag(category: string): Promise<CakeStore | undefined> {
  //   return this.StoreblRepo.find(category);
  // }
}
