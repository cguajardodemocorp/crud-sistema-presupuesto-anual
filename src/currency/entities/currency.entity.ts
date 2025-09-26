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
   // @OneToMany (() => AnnualPlan, (annualPlan) => annualPlan.currency)
    annualPlans: AnnualPlan[]; //Representa todos los AnnualPlan asociados a esta Moneda
}
