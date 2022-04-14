import { Controller, Get, Query } from '@nestjs/common';
import { CakeStoreService } from './cake-store.service';
import { CakeDetailDto } from './dto/cake-detail.dto';
import { CakkDummy } from './entities/CakkDummy.entity';

@Controller('cakestore')
export class CakeStoreController {
  constructor(private readonly cakeStoreService: CakeStoreService) {}

  @Get()
  async getAll(): Promise<CakkDummy[]> {
    return await this.cakeStoreService.findAll();
  }
}
