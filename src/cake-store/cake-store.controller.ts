import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CakeStoreService } from './cake-store.service';
import { CakeDetailDto } from './dto/cake-detail.dto';
import { CakkDummy } from './entities/CakkDummy.entity';
@ApiTags('CakeStore')
@Controller('cakestore')
export class CakeStoreController {
  constructor(private readonly cakeStoreService: CakeStoreService) {}

  @Get()
  async getAll(): Promise<CakkDummy[]> {
    // console.log(typeof (await this.cakeStoreService.findAll()));
    return await this.cakeStoreService.findAll();
  }
}
