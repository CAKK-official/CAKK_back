import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CakeStoreService } from './cake-store.service';
import { StoretblDummy } from './entities/StoretblDummy';

@ApiTags('CakeStore')
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
  findOne(
    @Param('storeId') storeId: number,
  ): Promise<StoretblDummy | undefined> {
    return this.cakeStoreService.findById(storeId);
  }
}
