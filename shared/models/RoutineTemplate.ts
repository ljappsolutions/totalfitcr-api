import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./Employee";
import { RoutineTemplateExercise } from "./RoutineTemplateExercise";

@Index(
  "fk_RoutineTemplate_Employee1_idx",
  ["employeeIdentification", "companyId"],
  {}
)
@Entity("RoutineTemplate", { schema: "totalfit_dev" })
export class RoutineTemplate {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("varchar", { name: "employee_identification", length: 9 })
  employeeIdentification: string;

  @Column("int", { name: "company_id" })
  companyId: number;

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

  @ManyToOne(() => Employee, (employee) => employee.routineTemplates, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "employee_identification", referencedColumnName: "identification" },
    { name: "company_id", referencedColumnName: "companyId" },
  ])
  employee: Employee;

  @OneToMany(
    () => RoutineTemplateExercise,
    (routineTemplateExercise) => routineTemplateExercise.routineTemplate
  )
  routineTemplateExercises: RoutineTemplateExercise[];
}
