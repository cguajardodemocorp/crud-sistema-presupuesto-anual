import {
    Column,
    DeleteDateColumn,
    Entity,
    OneToMany,
} from "typeorm";
import { Exclude } from 'class-transformer';
import { AnnualPlan } from "src/annual-plans/entities/annual-plan.entity";

@Entity('localidad') //Se personaliza el nombre de la tabla
export class Location {
    id: number;

    @Column({ type: 'varchar', nullable: false })
    nombre: string;

    //fecha de soft delete
    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date;

    // Relación 1:N con AnnualPlan
    @OneToMany(() => AnnualPlan, (annualPlan) => annualPlan.location)
    annualPlans: AnnualPlan[]; //Representa todos los AnnualPlan asociados a esta localidad
}
