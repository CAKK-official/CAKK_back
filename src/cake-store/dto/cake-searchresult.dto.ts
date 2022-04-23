import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { StoretblDummy } from '../entities/StoretblDummy';

export class cakeSearchResultDTO extends PickType(StoretblDummy, [
  'id',
  'name',
  'address',
]) {
  id: number;
  name: string;
  address: string;

  @IsArray()
  @ApiProperty({
    description: '사진 주소배열',
  })
  category: string;
}
