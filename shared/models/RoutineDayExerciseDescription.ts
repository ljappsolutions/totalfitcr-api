import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { RoutineDayExercise } from "./RoutineDayExercise";

@Entity("RoutineDayExerciseDescription", { schema: "totalfit_dev" })
export class RoutineDayExerciseDescription {
  @Column("int", { primary: true, name: "review_id" })
  reviewId: number;

  @Column("int", { primary: true, name: "day_number" })
  dayNumber: number;

  @Column("int", { primary: true, name: "company_exercise_id" })
  companyExerciseId: number;

  @Column("int", { primary: true, name: "week_nbr" })
  weekNbr: number;

  @Column("varchar", { name: "description", length: 100 })
  description: string;

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

  @ManyToOne(
    () => RoutineDayExercise,
    (routineDayExercise) => routineDayExercise.routineDayExerciseDescriptions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "review_id", referencedColumnName: "reviewId" },
    { name: "day_number", referencedColumnName: "dayNumber" },
    { name: "company_exercise_id", referencedColumnName: "companyExerciseId" },
  ])
  routineDayExercise: RoutineDayExercise;
}
