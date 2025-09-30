import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
} from "typeorm";
import { Exclude } from 'class-transformer';
import { AnnualPlan } from "src/annual-plans/entities/annual-plan.entity";
import { ActualCost } from "src/actual-cost/entities/actual-cost.entity";

@Entity('moneda') //Se personaliza el nombre de la tabla en la base de datos, por defecto sería currency
export class Currency {
    @Column({ primary: true, generated: true })
    id: number;

    @Column({ type: 'varchar', nullable: false })
    codigo: string;

    @Column()
    descripcion: string;
    
    //fecha de soft delete
    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date;

    // Relación 1:N con AnnualPlan
    @OneToMany (() => AnnualPlan, (annualPlan) => annualPlan.currency)
    annualPlans: AnnualPlan[]; //Representa todos los AnnualPlan asociados a esta Moneda

    // Relación 1:N con ActualCost
    @OneToMany (() => ActualCost, (actualCost) => actualCost.currency)
    actualCosts: ActualCost[]; //Representa todos los ActualCost asociados a esta Moneda
}
