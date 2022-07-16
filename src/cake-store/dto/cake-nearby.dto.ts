import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NearbyDTO {
  @ApiProperty({
    description: '[경도 ,위도]',
    example: '',
    nullable: true,
  })
  latlng: number[] | any;

  @IsString()
  @ApiProperty({
    description: '검색할 카테고리',
    example: 'letter',
    nullable: true,
  })
  category: string;
}
