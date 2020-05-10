import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./Employee";

@Index(
  "fk_CompanyClass_Employee1_idx",
  ["employeeIdentification", "companyId"],
  {}
)
@Entity("CompanyClass", { schema: "totalfit_dev" })
export class CompanyClass {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "employee_identification", length: 9 })
  employeeIdentification: string;

  @Column("int", { name: "company_id" })
  companyId: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("int", { name: "minutes_length" })
  minutesLength: number;

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

  @ManyToOne(() => Employee, (employee) => employee.companyClasses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "employee_identification", referencedColumnName: "identification" },
    { name: "company_id", referencedColumnName: "companyId" },
  ])
  employee: Employee;
}
