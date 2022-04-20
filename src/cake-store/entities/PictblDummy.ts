import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StoretblDummy } from "./StoretblDummy";

@Index("storeid", ["storeid"], {})
@Entity("pictbl_dummy", { schema: "cakk" })
export class PictblDummy {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "storeid", nullable: false })
  storeid: number | null;

  @Column("varchar", { name: "url", length: 500 })
  url: string;

  @Column("json", { name: "category" })
  category: object;

  @ManyToOne(
    () => StoretblDummy,
    (storetblDummy) => storetblDummy.pictblDummies,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "storeid", referencedColumnName: "id" }])
  store: StoretblDummy;
}
