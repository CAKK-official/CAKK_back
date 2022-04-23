import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pictbl } from './Pictbl';

@Entity('storetbl', { schema: 'cakk' })
export class Storetbl {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @ApiProperty({
    description: '가게id',
    example: 1,
  })
  id: number;

  @Column('char', { name: 'name', length: 30 })
  @ApiProperty({
    description: '가게 이름',
    example: '키키케이크',
  })
  name: string;

  @Column('varchar', { name: 'address', nullable: true, length: 50 })
  @ApiProperty({
    description: '검색할 지역 배열',
  })
  address: string | null;

  @Column('char', { name: 'tel', nullable: true, length: 15 })
  @ApiProperty({
    description: '가게 연락처',
    example: 'XX-XXXX-XXXX',
  })
  tel: string | null;

  @Column('varchar', { name: 'notice', nullable: true, length: 100 })
  @ApiProperty({
    description: '가게 공지사항+한 줄 설명',
  })
  notice: string | null;

  @Column('varchar', { name: 'url', nullable: true, length: 100 })
  @ApiProperty({
    description: '가게 인스타 주소',
    example: 'https://instagram.com/example',
  })
  url: string | null;

  @Column('varchar', { name: 'menu', length: 1000 })
  @ApiProperty({
    description: '가게 메뉴',
  })
  menu: string;

  @Column('varchar', { name: 'beforebuy', length: 500 })
  @ApiProperty({
    description: '주문 전 주의사항',
  })
  beforebuy: string;

  @Column('varchar', { name: 'whenbuy', length: 500 })
  @ApiProperty({
    description: '주문 시 주의사항',
  })
  whenbuy: string;

  @Column('varchar', { name: 'afterbuy', length: 500 })
  @ApiProperty({
    description: '주문 후 주의사항',
  })
  afterbuy: string;

  @Column('varchar', { name: 'opened', nullable: true, length: 50 })
  @ApiProperty({
    description: '가게 운영 시간',
  })
  opened: string | null;

  @Column('varchar', { name: 'closed', nullable: true, length: 30 })
  @ApiProperty({
    description: '가게 휴일',
  })
  closed: string | null;

  @Column('varchar', { name: 'picture', length: 500 })
  @ApiProperty({
    description: '가게 케이크 사진 썸네일',
  })
  picture: string;

  @Column('json', { name: 'latlng', nullable: true })
  @ApiProperty({
    description: '위도, 경도',
    example: '[37, 127]',
  })
  latlng: object | null;

  @Column('int', { name: 'views', nullable: true, default: () => "'0'" })
  @ApiProperty({
    description: '조회수',
  })
  views: number | null;

  @Column('int', { name: 'shares', nullable: true, default: () => "'0'" })
  @ApiProperty({
    description: '공유수',
  })
  shares: number | null;

  @OneToMany(() => Pictbl, (pictbl) => pictbl.store)
  pictbls: Pictbl[];
}
