import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CompanyClass } from "./CompanyClass";
import { Company } from "./Company";
import { Person } from "./Person";
import { Review } from "./Review";
import { RoutineTemplate } from "./RoutineTemplate";

@Index("fk_Employee_Company_idx", ["companyId"], {})
@Index("fk_Employee_Person1_idx", ["identification"], {})
@Entity("Employee", { schema: "totalfit_dev" })
export class Employee {
  @Column("varchar", { primary: true, name: "identification", length: 9 })
  identification: string;

  @Column("int", { primary: true, name: "company_id" })
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

  @OneToMany(() => CompanyClass, (companyClass) => companyClass.employee)
  companyClasses: CompanyClass[];

  @ManyToOne(() => Company, (company) => company.employees, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "company_id", referencedColumnName: "id" }])
  company: Company;

  @ManyToOne(() => Person, (person) => person.employees, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "identification", referencedColumnName: "identification" },
  ])
  identification2: Person;

  @OneToMany(() => Review, (review) => review.employee)
  reviews: Review[];

  @OneToMany(
    () => RoutineTemplate,
    (routineTemplate) => routineTemplate.employee
  )
  routineTemplates: RoutineTemplate[];
}
