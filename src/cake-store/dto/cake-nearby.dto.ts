import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NearbyDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: '[경도 ,위도]',
    example: [126.921957, 37.558957],
  })
  latlng: number[];

  @IsString()
  @ApiProperty({
    description: '검색할 카테고리',
    example: 'letter',
    nullable: true,
  })
  category: string;
}
