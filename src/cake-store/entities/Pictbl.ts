import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Storetbl } from './Storetbl';

@Index('storeid', ['storeid'], {})
@Entity('pictbl', { schema: 'cakk' })
export class Pictbl {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @ApiProperty({
    description: '사진테이블 PK',
    example: 1,
  })
  id: number;

  @Column('int', { name: 'storeid', nullable: false })
  @ApiProperty({
    description: '케이크 가게 id',
    example: 1,
  })
  storeid: number | null;

  @Column('varchar', { name: 'url', length: 500 })
  @ApiProperty({
    description: '사진 주소',
  })
  url: string;

  @Column('json', { name: 'category' })
  @ApiProperty({
    description: '사진 카테고리',
    example: 'letter',
  })
  category: object;

  @ManyToOne(() => Storetbl, (storetbl) => storetbl.pictbls, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'storeid', referencedColumnName: 'id' }])
  store: Storetbl;
}
