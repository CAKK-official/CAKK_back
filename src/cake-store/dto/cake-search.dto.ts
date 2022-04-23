import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CakeSearchDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '검색할 주소',
    example: '["강남구", "강동구"]',
  })
  addresses: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '검색할 카테고리',
    example: '레터링케이크',
  })
  category: string;
}
