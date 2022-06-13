import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber, IsString, IsJSON, IsUrl } from 'class-validator';
import { Storetbl } from '../entities/Storetbl';

export class StoreEachDto extends PickType(Storetbl, [
  'id',
  'name',
  'address',
  'tel',
  'notice',
  'url',
  'menu',
  'beforebuy',
  'afterbuy',
  'whenbuy',
  'opened',
  'closed',
  'latlng',
] as const) {
  @IsJSON()
  pictArray: object;

  @IsJSON()
  storeCategory: object;
}
