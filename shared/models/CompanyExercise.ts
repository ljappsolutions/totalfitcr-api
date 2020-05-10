import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./Company";
import { Exercise } from "./Exercise";
import { RoutineDayExercise } from "./RoutineDayExercise";
import { RoutineTemplateExercise } from "./RoutineTemplateExercise";

@Index("fk_CompanyExercise_Company1_idx", ["companyId"], {})
@Index("fk_CompanyExercise_Exercise1_idx", ["exerciseId"], {})
@Entity("CompanyExercise", { schema: "totalfit_dev" })
export class CompanyExercise {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "company_id" })
  companyId: number;

  @Column("int", { name: "exercise_id", nullable: true })
  exerciseId: number | null;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name: string | null;

  @Column("varchar", { name: "machine", nullable: true, length: 45 })
  machine: string | null;

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

  @ManyToOne(() => Company, (company) => company.companyExercises, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "company_id", referencedColumnName: "id" }])
  company: Company;

  @ManyToOne(() => Exercise, (exercise) => exercise.companyExercises, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "exercise_id", referencedColumnName: "id" }])
  exercise: Exercise;

  @OneToMany(
    () => RoutineDayExercise,
    (routineDayExercise) => routineDayExercise.companyExercise
  )
  routineDayExercises: RoutineDayExercise[];

  @OneToMany(
    () => RoutineTemplateExercise,
    (routineTemplateExercise) => routineTemplateExercise.companyExercise
  )
  routineTemplateExercises: RoutineTemplateExercise[];
}
