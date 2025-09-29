import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
} from "typeorm";
import { Exclude } from 'class-transformer';
import { AnnualPlan } from "src/annual-plans/entities/annual-plan.entity";

@Entity('cuenta') //Se personaliza el nombre de la tabla en la base de datos, por defecto sería account
export class Account {
@Column({ primary: true, generated: true })
    id: number;
    
    @Column({ type: 'varchar', nullable: false })
    nombre: string;

    //fecha de soft delete
    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date;

    // Relación 1:N con AnnualPlan
    @OneToMany (() => AnnualPlan, (annualPlan) => annualPlan.account)
    annualPlans: AnnualPlan[]; //Representa todos los AnnualPlan asociados a esta cuenta
} 
}
