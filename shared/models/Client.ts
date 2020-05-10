import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Company } from "./Company";
import { Person } from "./Person";
import { Review } from "./Review";

@Index("fk_Client_Company1_idx", ["companyId"], {})
@Entity("Client", { schema: "totalfit_dev" })
export class Client {
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

  @ManyToOne(() => Company, (company) => company.clients, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "company_id", referencedColumnName: "id" }])
  company: Company;

  @ManyToOne(() => Person, (person) => person.clients, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "identification", referencedColumnName: "identification" },
  ])
  identification2: Person;

  @OneToMany(() => Review, (review) => review.client)
  reviews: Review[];
}
