import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { StoretblDummy } from './StoretblDummy';

@Entity('pictbl_dummy', { schema: 'cakk' })
export class PictblDummy {
  @Column('int', { primary: true, name: 'storeid' })
  storeid: number;

  @Column('varchar', { name: 'url', length: 500 })
  url: string;

  @Column('char', { name: 'category', length: 15 })
  category: string;

  @OneToOne(() => StoretblDummy, (storetblDummy) => storetblDummy.pictblDummy, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'storeid', referencedColumnName: 'id' }])
  store: StoretblDummy;
}
