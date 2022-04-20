import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CakeStoreService } from './cake-store.service';
import { CakeDetailDto } from './dto/cake-detail.dto';
import { StoretblDummy } from './entities/StoretblDummy';

@ApiTags('CakeStore')
@Controller('cakestore')
export class CakeStoreController {
  constructor(private readonly cakeStoreService: CakeStoreService) {}

  @Get()
  async getAll(): Promise<StoretblDummy[]> {
    // console.log(typeof (await this.cakeStoreService.findAll()));
    return await this.cakeStoreService.findAll();
  }
}
