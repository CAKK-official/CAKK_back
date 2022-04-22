import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { StoretblDummy } from '../entities/StoretblDummy';

export class cakeSearchResultDto extends PickType(StoretblDummy, [
  'id',
  'name',
  'address',
]) {
  @IsArray()
  @ApiProperty({
    description: '사진 주소배열',
  })
  category: string;
}
