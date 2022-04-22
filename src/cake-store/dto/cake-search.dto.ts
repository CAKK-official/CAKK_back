import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CakeSearchDTO {
  @IsString()
  addresses: string[];

  @IsString()
  @ApiProperty({
    description: '검색할 카테고리',
  })
  category: string;
}
