import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { CompanyExercise } from "./CompanyExercise";
import { Employee } from "./Employee";

@Entity("Company", { schema: "totalfit_dev" })
export class Company {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 90 })
  name: string;

  @Column("varchar", { name: "address", nullable: true, length: 150 })
  address: string | null;

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

  @OneToMany(() => Client, (client) => client.company)
  clients: Client[];

  @OneToMany(
    () => CompanyExercise,
    (companyExercise) => companyExercise.company
  )
  companyExercises: CompanyExercise[];

  @OneToMany(() => Employee, (employee) => employee.company)
  employees: Employee[];
}
