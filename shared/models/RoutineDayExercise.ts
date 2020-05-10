import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CompanyExercise } from "./CompanyExercise";
import { RoutineDay } from "./RoutineDay";
import { RoutineDayExerciseDescription } from "./RoutineDayExerciseDescription";

@Index("fk_RoutineDayExercise_CompanyExercise1_idx", ["companyExerciseId"], {})
@Entity("RoutineDayExercise", { schema: "totalfit_dev" })
export class RoutineDayExercise {
  @Column("int", { primary: true, name: "review_id" })
  reviewId: number;

  @Column("int", { primary: true, name: "day_number" })
  dayNumber: number;

  @Column("int", { primary: true, name: "company_exercise_id" })
  companyExerciseId: number;

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
    () => CompanyExercise,
    (companyExercise) => companyExercise.routineDayExercises,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "company_exercise_id", referencedColumnName: "id" }])
  companyExercise: CompanyExercise;

  @ManyToOne(() => RoutineDay, (routineDay) => routineDay.routineDayExercises, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "review_id", referencedColumnName: "reviewId" },
    { name: "day_number", referencedColumnName: "dayNumber" },
  ])
  routineDay: RoutineDay;

  @OneToMany(
    () => RoutineDayExerciseDescription,
    (routineDayExerciseDescription) =>
      routineDayExerciseDescription.routineDayExercise
  )
  routineDayExerciseDescriptions: RoutineDayExerciseDescription[];
}
