import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Storetbl } from './Storetbl';

@Index('storeid', ['storeid'], {})
@Entity('pictbl', { schema: 'cakk' })
export class Pictbl {
  @Column('int', { name: 'storeid', nullable: true })
  storeid: number | null;

  @Column('varchar', { name: 'url', length: 500 })
  url: string;

  @Column('char', { name: 'category', length: 15 })
  category: string;

  @ManyToOne(() => Storetbl, (storetbl) => storetbl.pictbls, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'storeid', referencedColumnName: 'id' }])
  store: Storetbl;
}
