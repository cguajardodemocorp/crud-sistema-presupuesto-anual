import { AnnualPlan } from "src/annual-plans/entities/annual-plan.entity";
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";

@Entity('plan_detalle')
export class DetailPlan {

    @Column({ primary: true, generated: true })
    id: number;

    @ManyToOne(() => AnnualPlan, (annualPlan) => annualPlan.id)
    annualPlan: AnnualPlan;

    @Column()
    mes: number;

    @Column()
    monto: number;

}
    