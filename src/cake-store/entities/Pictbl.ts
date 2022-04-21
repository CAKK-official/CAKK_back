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
  id: number;

  @Column('int', { name: 'storeid', nullable: false })
  storeid: number | null;

  @Column('varchar', { name: 'url', length: 500 })
  url: string;

  @Column('json', { name: 'category' })
  category: object;

  @ManyToOne(() => Storetbl, (storetbl) => storetbl.pictbls, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'storeid', referencedColumnName: 'id' }])
  store: Storetbl;
}
