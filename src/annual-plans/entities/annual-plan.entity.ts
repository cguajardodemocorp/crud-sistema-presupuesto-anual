import { IsInt, MATCHES } from "class-validator";
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { Exclude } from 'class-transformer';
import { DetailPlan } from "src/detail-plans/entities/detail-plan.entity";
import { Ceco } from "src/ceco/entities/ceco.entity";
import { Country } from "src/country/entities/country.entity";
import { count } from "console";


@Entity('plan_presupuestario')
export class AnnualPlan {
  //Mapeo concolumnas de la base de datos
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  pais_id: number;
  @ManyToOne(() => Country, (country) => country.annualPlans, {
    eager: true, //Para que siempre que se consulte un AnnualPlan, traiga el País asociado
  })
  @JoinColumn({ name: 'pais_id' })
  country: Country;

  @Column()
  razon_social_id: number;

  @Column()
  ceco_id: number;
  @ManyToOne(() => Ceco, (ceco) => ceco.annualPlans, {
    eager: true, //Para que siempre que se consulte un AnnualPlan, traiga el Ceco asociado
  })
  @JoinColumn({ name: 'ceco_id' })
  ceco: Ceco;

  @Column()
  cuenta_id: number;

  @Column()
  area_id: number;

  @Column()
  recurso_id: number;

  @Column()
  localidad_id: number;

  @Column()
  tarifa: number;

  @Column()
  moneda_id: number;

  @Column({ type: 'int' })
  anio: number;

  @Column()
  usuario_id: number;

  @Column()
  fecha_carga: Date;

  @Column()
  tipo_carga: string;

  @Column()
  mes: number;

  @Column()
  cantidad: number;

  @OneToMany(() => DetailPlan, (detailPlan) => detailPlan.annualPlan)
  anual_plans: DetailPlan[];

  //fecha de soft delete
  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}

