import { AnnualPlan } from "src/annual-plans/entities/annual-plan.entity";
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";

@Entity('plan_detalle')
export class DetailPlan {

    @Column({ primary: true, generated: true })
    id: number;

    @ManyToOne(() => AnnualPlan, (annualPlan) => annualPlan, {
        cascade: true,
        eager: true, //Para que siempre que se consulte un DetailPlan, traiga el AnnualPlan asociado
    })
    annualPlan: AnnualPlan;
    //@Column({ name: 'plan_presupuestario_id' })

    @Column()
    mes: number;

    @Column()
    monto: number;

}
    