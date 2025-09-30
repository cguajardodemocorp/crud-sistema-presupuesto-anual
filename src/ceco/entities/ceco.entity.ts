import { IsInt } from "class-validator";
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exclude } from 'class-transformer';
import { AnnualPlan } from "src/annual-plans/entities/annual-plan.entity";
import { ActualCost } from "src/actual-cost/entities/actual-cost.entity";

@Entity('ceco')
export class Ceco {
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
    @OneToMany (() => AnnualPlan, (annualPlan) => annualPlan.ceco)
    annualPlans: AnnualPlan[]; //Representa todos los AnnualPlan asociados a este Ceco

    // Relación 1:N con ActualCost
    @OneToMany (() => ActualCost, (actualCost) => actualCost.ceco)
    actualCosts: ActualCost[]; //Representa todos los ActualCost asociados a este Ceco

}
