import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createQueryBuilder } from 'typeorm';
import { CakeStoreService } from './cake-store.service';
import { StoretblDummy } from './entities/StoretblDummy';
import { StoretblDto } from './dto/cake-Each.dto';
@Controller('cakestore')
export class CakeStoreController {
  constructor(private readonly cakeStoreService: CakeStoreService) {}

  // 전체 데이터 불러오기
  @Get()
  async getAll(): Promise<StoretblDummy[]> {
    return await this.cakeStoreService.findAll();
  }

  // id로 가게별 데이터 불러오기
  @ApiTags('Detail')
  @Get(':storeId')
  async findOne(
    @Param('storeId') storeId: number,
  ): Promise<StoretblDto | undefined> {
    const StoreEnt = await this.cakeStoreService.findById(storeId);
    const pictEnts = await this.cakeStoreService.findBystoreId(storeId);
    const pictArray = [];
    const storeCategory = [];
    const {
      id,
      name,
      address,
      tel,
      notice,
      url,
      menu,
      beforebuy,
      afterbuy,
      whenbuy,
      opened,
      closed,
      latlng,
    } = StoreEnt;

    // delete StoreEnt.picture;
    // delete StoreEnt.views;
    // delete StoreEnt.shares;

    pictEnts.forEach((v) => {
      pictArray.push(v.url);
      [].forEach.call(v.category, function (e, i, a) {
        Logger.log(e);
        storeCategory.push(e);
      });
    });
    const StoreEnts = {
      id,
      name,
      address,
      tel,
      notice,
      url,
      menu,
      beforebuy,
      afterbuy,
      whenbuy,
      opened,
      closed,
      latlng,
      pictArray,
      storeCategory,
    };

    // Logger.log(StoreEnt);
    Logger.log(pictArray);
    Logger.log(storeCategory);

    return StoreEnts;
  }
}
