import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsJSON, IsUrl } from 'class-validator';

export class StoreEachDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  tel: string;

  @IsString()
  notice: string;

  @IsUrl()
  url: string;

  @IsString()
  menu: string;

  @IsString()
  beforebuy: string;

  @IsString()
  whenbuy: string;

  @IsString()
  afterbuy: string;

  @IsString()
  opened: string;

  @IsString()
  closed: string;

  @IsJSON()
  latlng: object;

  @IsJSON()
  pictArray: object;

  @IsJSON()
  storeCategory: object;
}
