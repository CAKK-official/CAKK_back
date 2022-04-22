import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsString } from 'class-validator';

export class CakeSearchDTO {
  @IsJSON()
  @ApiProperty({
    description: '검색할 주소',
    example: '["강남구", "강동구"]',
  })
  addresses: string[];

  @IsString()
  @ApiProperty({
    description: '검색할 카테고리',
    example: '레터링케이크',
  })
  category: string;
}
