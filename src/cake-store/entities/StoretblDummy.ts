import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PictblDummy } from "./PictblDummy";

@Entity("storetbl_dummy", { schema: "cakk" })
export class StoretblDummy {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("char", { name: "name", length: 30 })
  name: string;

  @Column("varchar", { name: "address", nullable: true, length: 50 })
  address: string | null;

  @Column("char", { name: "tel", nullable: true, length: 15 })
  tel: string | null;

  @Column("varchar", { name: "notice", nullable: true, length: 100 })
  notice: string | null;

  @Column("varchar", { name: "url", nullable: true, length: 100 })
  url: string | null;

  @Column("varchar", { name: "menu", length: 1000 })
  menu: string;

  @Column("varchar", { name: "beforebuy", length: 500 })
  beforebuy: string;

  @Column("varchar", { name: "whenbuy", length: 500 })
  whenbuy: string;

  @Column("varchar", { name: "afterbuy", length: 500 })
  afterbuy: string;

  @Column("varchar", { name: "opened", nullable: true, length: 50 })
  opened: string | null;

  @Column("varchar", { name: "closed", nullable: true, length: 30 })
  closed: string | null;

  @Column("varchar", { name: "picture", length: 500 })
  picture: string;

  @Column("json", { name: "latlng", nullable: true })
  latlng: object | null;

  @Column("int", { name: "views", nullable: true, default: () => "'0'" })
  views: number | null;

  @Column("int", { name: "shares", nullable: true, default: () => "'0'" })
  shares: number | null;

  @OneToMany(() => PictblDummy, (pictblDummy) => pictblDummy.store)
  pictblDummies: PictblDummy[];
}
