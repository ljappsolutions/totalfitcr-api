import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { CompanyExercise } from "./CompanyExercise";
import { RoutineTemplate } from "./RoutineTemplate";

@Index(
  "fk_RoutineTemplateExercise_RoutineTemplate1_idx",
  ["routineTemplateId"],
  {}
)
@Index(
  "fk_RoutineTemplateExercise_CompanyExercise1_idx",
  ["companyExerciseId"],
  {}
)
@Entity("RoutineTemplateExercise", { schema: "totalfit_dev" })
export class RoutineTemplateExercise {
  @Column("int", { primary: true, name: "routine_template_id" })
  routineTemplateId: number;

  @Column("int", { primary: true, name: "company_exercise_id" })
  companyExerciseId: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "udated_at", default: () => "CURRENT_TIMESTAMP" })
  udatedAt: Date;

  @ManyToOne(
    () => CompanyExercise,
    (companyExercise) => companyExercise.routineTemplateExercises,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "company_exercise_id", referencedColumnName: "id" }])
  companyExercise: CompanyExercise;

  @ManyToOne(
    () => RoutineTemplate,
    (routineTemplate) => routineTemplate.routineTemplateExercises,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "routine_template_id", referencedColumnName: "id" }])
  routineTemplate: RoutineTemplate;
}
