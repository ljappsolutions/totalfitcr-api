import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client";
import { Employee } from "./Employee";
import { Routine } from "./Routine";

@Index("fk_Review_Client1_idx", ["clientIdentification", "clientCompanyId"], {})
@Index(
  "fk_Review_Employee1_idx",
  ["employeeIdentification", "employeeCompanyId"],
  {}
)
@Entity("Review", { schema: "totalfit_dev" })
export class Review {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "client_identification", length: 9 })
  clientIdentification: string;

  @Column("int", { name: "client_company_id" })
  clientCompanyId: number;

  @Column("float", { name: "fat", precision: 12 })
  fat: number;

  @Column("float", { name: "muscle", precision: 12 })
  muscle: number;

  @Column("float", { name: "water", precision: 12 })
  water: number;

  @Column("float", { name: "height", precision: 12 })
  height: number;

  @Column("float", { name: "weight", precision: 12 })
  weight: number;

  @Column("datetime", { name: "appointment_date" })
  appointmentDate: Date;

  @Column("varchar", {
    name: "employee_identification",
    nullable: true,
    length: 9,
  })
  employeeIdentification: string | null;

  @Column("int", { name: "employee_company_id", nullable: true })
  employeeCompanyId: number | null;

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

  @ManyToOne(() => Client, (client) => client.reviews, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "client_identification", referencedColumnName: "identification" },
    { name: "client_company_id", referencedColumnName: "companyId" },
  ])
  client: Client;

  @ManyToOne(() => Employee, (employee) => employee.reviews, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "employee_identification", referencedColumnName: "identification" },
    { name: "employee_company_id", referencedColumnName: "companyId" },
  ])
  employee: Employee;

  @OneToOne(() => Routine, (routine) => routine.review)
  routine: Routine;
}
