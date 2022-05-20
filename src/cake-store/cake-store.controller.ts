import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CakeStoreService } from './cake-store.service';
import { Storetbl } from './entities/Storetbl';
import { StoreEachDto } from './dto/cake-Each.dto';
import { cakeSearchResultDTO } from './dto/cake-searchresult.dto';
import { CakeSearchDTO } from './dto/cake-search.dto';
import { Query } from '@nestjs/common';
@Controller('cakestore')
export class CakeStoreController {
  constructor(private readonly cakeStoreService: CakeStoreService) {}

  // 전체 데이터 불러오기
  @Get()
  async getAll(): Promise<Storetbl[]> {
    return await this.cakeStoreService.findAll();
  }

  //인기 케이크 가게 (3개) 가져오기
  @Get('/popular')
  async popularStoreSearch() {
    return await this.cakeStoreService.popularStoreSearch();
  }

  // 가게 검색하기
  @Post('/search')
  async storeSearch(
    @Query('page') page,
    @Body() data: CakeSearchDTO,
  ): Promise<cakeSearchResultDTO[]> {
    return await this.cakeStoreService.storeSearch(page, data);
  }

  // ID로 한 가게 데이터 불러오기
  @Get('/:storeId')
  async findOne(@Param('storeId') storeId: number): Promise<StoreEachDto[]> {
    await this.cakeStoreService.addViews(storeId);
    const data = await this.cakeStoreService.findById(storeId);
    const tempCategpry = [];
    const originalCategory = data[0].storeCategory;
    originalCategory.forEach((v) => {
      v.forEach((e) => {
        tempCategpry.push(e);
      });
    });
    data[0].storeCategory = tempCategpry;
    Logger.log(data[0].storeCategory);
    return data;
  }

  @ApiTags('Detail')
  @Get('share/:storeId')
  async addShare(@Param('storeId') storeId: number): Promise<void> {
    await this.cakeStoreService.addShares(storeId);
  }
}
