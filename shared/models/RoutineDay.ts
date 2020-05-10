import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Routine } from "./Routine";
import { RoutineDayExercise } from "./RoutineDayExercise";

@Entity("RoutineDay", { schema: "totalfit_dev" })
export class RoutineDay {
  @Column("int", { primary: true, name: "review_id" })
  reviewId: number;

  @Column("int", { primary: true, name: "day_number" })
  dayNumber: number;

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

  @ManyToOne(() => Routine, (routine) => routine.routineDays, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "review_id", referencedColumnName: "reviewId" }])
  review: Routine;

  @OneToMany(
    () => RoutineDayExercise,
    (routineDayExercise) => routineDayExercise.routineDay
  )
  routineDayExercises: RoutineDayExercise[];
}
