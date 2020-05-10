import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CompanyExercise } from "./CompanyExercise";

@Entity("Exercise", { schema: "totalfit_dev" })
export class Exercise {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

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

  @OneToMany(
    () => CompanyExercise,
    (companyExercise) => companyExercise.exercise
  )
  companyExercises: CompanyExercise[];
}
