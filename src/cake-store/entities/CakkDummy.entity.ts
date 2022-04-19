import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity('cakk_dummy', { schema: 'cakestore' })
export class CakkDummy {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number | null;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('text', { name: 'address', nullable: true })
  address: string | null;

  @Column('text', { name: 'tel', nullable: true })
  tel: string | null;

  @Column('text', { name: 'notice', nullable: true })
  notice: string | null;

  @Column('text', { name: 'url', nullable: true })
  url: string | null;

  @Column('json', { name: 'tag', nullable: true })
  tag: object | null;

  @Column('text', { name: 'menu', nullable: true })
  menu: string | null;

  @Column('text', { name: 'precautions', nullable: true })
  precautions: string | null;

  @Column('text', { name: 'others', nullable: true })
  others: string | null;

  @Column('text', { name: 'opened', nullable: true })
  opened: string | null;

  @Column('text', { name: 'closed', nullable: true })
  closed: string | null;

  @Column('json', { name: 'picture', nullable: true })
  picture: object | null;

  @Column('json', { name: 'latlng', nullable: true })
  latlng: object | null;

  @Column('json', { name: 'category', nullable: true })
  category: object | null;

  @Column('int', { name: 'views', nullable: true })
  views: number | null;
}
