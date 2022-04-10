import { Controller } from '@nestjs/common';
import { CakeStoreService } from './cake-store.service';

@Controller('cake-store')
export class CakeStoreController {
  constructor(private readonly cakeStoreService: CakeStoreService) {}
}
