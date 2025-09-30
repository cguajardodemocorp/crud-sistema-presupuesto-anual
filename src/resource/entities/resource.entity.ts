import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
} from "typeorm";
import { Exclude } from 'class-transformer';
import { AnnualPlan } from "src/annual-plans/entities/annual-plan.entity";

@Entity('recurso') //Se personaliza el nombre de la tabla
export class Resource {
@Column({ primary: true, generated: true })
    id: number;
    
    @Column({ type: 'varchar', nullable: false })
    nombre: string;

    //fecha de soft delete
    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date;

    /* descomentar cuando se relacione id de recurso con annual-plan
    // Relación 1:N con AnnualPlan
    @OneToMany (() => AnnualPlan, (annualPlan) => annualPlan.resource)
    annualPlans: AnnualPlan[]; //Representa todos los AnnualPlan asociados a este recurso
    */
}
