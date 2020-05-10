import { Column, Entity, OneToMany } from "typeorm";
import { Routine } from "./Routine";

@Entity("RoutineFocus", { schema: "totalfit_dev" })
export class RoutineFocus {
  @Column("varchar", { primary: true, name: "name", length: 50 })
  name: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(() => Routine, (routine) => routine.focus2)
  routines: Routine[];
}
