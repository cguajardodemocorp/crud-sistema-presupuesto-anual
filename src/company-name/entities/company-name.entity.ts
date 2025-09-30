import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
} from "typeorm";
import { Exclude } from 'class-transformer';
import { AnnualPlan } from "src/annual-plans/entities/annual-plan.entity";
import { ActualCost } from "src/actual-cost/entities/actual-cost.entity";

@Entity('razon_social') //Se personaliza el nombre de la tabla en la base de datos, por defecto sería company_name
export class CompanyName {
    @Column({ primary: true, generated: true })
    id: number;
    
    @Column({ type: 'varchar', nullable: false })
    nombre: string;

    //fecha de soft delete
    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date;

    // Relación 1:N con AnnualPlan
    @OneToMany (() => AnnualPlan, (annualPlan) => annualPlan.companyName)
    annualPlans: AnnualPlan[]; //Representa todos los AnnualPlan asociados a este Razon Social

    // Relación 1:N con ActualCost
    @OneToMany (() => ActualCost, (actualCost) => actualCost.companyName)
    actualCosts: ActualCost[]; //Representa todos los ActualCost asociados a este Razon Social
}
