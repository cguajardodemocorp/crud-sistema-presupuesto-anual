import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
} from "typeorm";
import { Exclude } from 'class-transformer';
import { AnnualPlan } from "src/annual-plans/entities/annual-plan.entity";
import { IsNotEmpty, IsString } from "class-validator";

@Entity('pais') //Se personaliza el nombre de la tabla en la base de datos, por defecto sería country
export class Country {
    @Column({ primary: true, generated: true })
    id: number;
    
    @Column({ type: 'varchar', nullable: false })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    //fecha de soft delete
    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date;

    // Relación 1:N con AnnualPlan
    @OneToMany (() => AnnualPlan, (annualPlan) => annualPlan.country)
    annualPlans: AnnualPlan[]; //Representa todos los AnnualPlan asociados a este País
}
