import { Column, Entity, OneToMany } from "typeorm";
import { Client } from "./Client";
import { Employee } from "./Employee";

@Entity("Person", { schema: "totalfit_dev" })
export class Person {
  @Column("varchar", { primary: true, name: "identification", length: 9 })
  identification: string;

  @Column("varchar", { name: "first_name", length: 90 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 90 })
  lastName: string;

  @Column("datetime", { name: "birth_date", nullable: true })
  birthDate: Date | null;

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

  @OneToMany(() => Client, (client) => client.identification2)
  clients: Client[];

  @OneToMany(() => Employee, (employee) => employee.identification2)
  employees: Employee[];
}
