import { Exclude } from "class-transformer";
import { AnnualPlan } from "src/annual-plans/entities/annual-plan.entity";
import { 
    Column, 
    DeleteDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne } from "typeorm";

@Entity('plan_detalle')
export class DetailPlan {

    @Column({ primary: true, generated: true })
    id: number;

    @ManyToOne(() => AnnualPlan, (annualPlan) => annualPlan.id, {
        //cascade: true,
        eager: true, //Para que siempre que se consulte un DetailPlan, traiga el AnnualPlan asociado
    })
    @JoinColumn({ name: 'plan_presupuestario_id' })
    annualPlan: AnnualPlan;

    @Column()
    mes: number;

    @Column()
    monto: number;

    //fecha de soft delete
    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date;

}
