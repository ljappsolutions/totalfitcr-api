import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Review } from "./Review";
import { RoutineFocus } from "./RoutineFocus";
import { RoutineDay } from "./RoutineDay";

@Index("fk_Routine_Review1_idx", ["reviewId"], {})
@Index("fk_Routine_RoutineFocus1_idx", ["focus"], {})
@Entity("Routine", { schema: "totalfit_dev" })
export class Routine {
  @Column("int", { primary: true, name: "review_id" })
  reviewId: number;

  @Column("int", { name: "number_weeks" })
  numberWeeks: number;

  @Column("int", { name: "number_routines" })
  numberRoutines: number;

  @Column("varchar", { name: "focus", length: 50 })
  focus: string;

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

  @OneToOne(() => Review, (review) => review.routine, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "review_id", referencedColumnName: "id" }])
  review: Review;

  @ManyToOne(() => RoutineFocus, (routineFocus) => routineFocus.routines, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "focus", referencedColumnName: "name" }])
  focus2: RoutineFocus;

  @OneToMany(() => RoutineDay, (routineDay) => routineDay.review)
  routineDays: RoutineDay[];
}
