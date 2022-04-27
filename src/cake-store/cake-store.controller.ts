import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CakeStoreService } from './cake-store.service';
import { StoretblDummy } from './entities/StoretblDummy';
import { StoretblDto } from './dto/cake-Each.dto';
import { cakeSearchResultDTO } from './dto/cake-searchresult.dto';
import { CakeSearchDTO } from './dto/cake-search.dto';
import { Query } from '@nestjs/common';
@Controller('cakestore')
export class CakeStoreController {
  constructor(private readonly cakeStoreService: CakeStoreService) {}

  // 전체 데이터 불러오기
  @Get()
  async getAll(): Promise<StoretblDummy[]> {
    return await this.cakeStoreService.findAll();
  }

  // 가게 검색하기
  @Post('/search')
  async storeSerach(
    @Query('page') page,
    @Body() data: CakeSearchDTO,
  ): Promise<cakeSearchResultDTO[]> {
    return await this.cakeStoreService.storeSearch(page, data);
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

    pictEnts.forEach((v) => {
      pictArray.push(v.url);
      [].forEach.call(v.category, function (e, i, a) {
        // Logger.log(e);
        storeCategory.push(e);
      });
    });
    const result = {
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
    // Logger.log(pictArray);
    // Logger.log(storeCategory);

    return result;
  }

  @ApiTags('Detail')
  @Get('share/:storeId')
  async addShare(@Param('storeId') storeId: number): Promise<void> {
    await this.cakeStoreService.addShares(storeId);
  }
}
