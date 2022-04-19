import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity('storetbl_dummy', { schema: 'cakestore' })
export class CakeStore {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number | null;

  @Column('text', { name: 'name', nullable: false })
  name: string | null;

  @Column('text', { name: 'address', nullable: true })
  address: string | null;

  @Column('text', { name: 'tel', nullable: true })
  tel: string | null;

  @Column('text', { name: 'notice', nullable: true })
  notice: string | null;

  @Column('text', { name: 'url', nullable: true })
  url: string | null;

  @Column('text', { name: 'menu', nullable: true })
  menu: string | null;

  @Column('text', { name: 'beforebuy', nullable: true })
  beforebuy: string | null;

  @Column('text', { name: 'whenbuy', nullable: true })
  whenbuy: string | null;

  @Column('text', { name: 'afterbuy', nullable: true })
  afterbuy: string | null;

  @Column('text', { name: 'others', nullable: true })
  others: string | null;

  @Column('text', { name: 'opened', nullable: true })
  opened: string | null;

  @Column('text', { name: 'closed', nullable: true })
  closed: string | null;

  @Column('text', { name: 'picture', nullable: true })
  picture: string | null;

  @Column('json', { name: 'latlng', nullable: true })
  latlng: object | null;

  @Column('int', { name: 'views', nullable: true })
  views: number | null;

  @Column('int', { name: 'shares', nullable: true })
  shares: number | null;
}
