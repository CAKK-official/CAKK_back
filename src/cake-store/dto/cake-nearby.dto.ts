import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NearbyDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: '[경도 ,위도]',
    example: [127.1091949, 37.5112439],
  })
  latlng: number[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '검색할 카테고리',
    example: 'letter',
  })
  category: string;
}
