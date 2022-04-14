import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("storetbl", { schema: "cakk" })
export class Storetbl {
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

  @Column("json", { name: "tag", nullable: true })
  tag: object | null;

  @Column("varchar", { name: "menu", length: 1000 })
  menu: string;

  @Column("varchar", { name: "precautions", length: 1000 })
  precautions: string;

  @Column("varchar", { name: "others", nullable: true, length: 1000 })
  others: string | null;

  @Column("varchar", { name: "opened", nullable: true, length: 40 })
  opened: string | null;

  @Column("varchar", { name: "closed", nullable: true, length: 30 })
  closed: string | null;

  @Column("json", { name: "picture" })
  picture: object;

  @Column("json", { name: "latlng", nullable: true })
  latlng: object | null;

  @Column("json", { name: "category", nullable: true })
  category: object | null;

  @Column("int", { name: "views", nullable: true, default: () => "'0'" })
  views: number | null;
}
