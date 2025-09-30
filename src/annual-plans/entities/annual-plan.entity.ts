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
import { Currency } from "src/currency/entities/currency.entity";
import { CompanyName } from "src/company-name/entities/company-name.entity";
import { Account } from "src/account/entities/account.entity";
import { Area } from "src/area/entities/area.entity";
import { Resource } from "src/resource/entities/resource.entity"; //Se usa cuando se relacione id de recurso con annual-plan


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
  @ManyToOne(() => CompanyName, (companyName) => companyName.annualPlans, {
    eager: true, //Para que siempre que se consulte un AnnualPlan, traiga la Razon Social asociada
  })
  @JoinColumn({ name: 'razon_social_id' })
  companyName: CompanyName;

  @Column()
  ceco_id: number;
  @ManyToOne(() => Ceco, (ceco) => ceco.annualPlans, {
    eager: true, //Para que siempre que se consulte un AnnualPlan, traiga el Ceco asociado
  })
  @JoinColumn({ name: 'ceco_id' })
  ceco: Ceco;

  @Column()
  cuenta_id: number;
  @ManyToOne(() => Account, (account) => account.annualPlans, {
    eager: true, //Para que siempre que se consulte un AnnualPlan, traiga la Cuenta asociada
  })
  @JoinColumn({ name: 'cuenta_id' })
  account: Account;

  @Column()
  area_id: number;
  @ManyToOne(() => Area, (area) => area.annualPlans, {
    eager: true, //Para que siempre que se consulte un AnnualPlan, traiga el Area asociada
  })
  @JoinColumn({ name: 'area_id' })
  area: Area;

  /* Agregar esta relacion cuando se relacione id de recurso
  @Column()
  recurso_id: number;
  @ManyToOne(() => Resource, (resource) => resource.annualPlans, {
    eager: true, //Para que siempre que se consulte un AnnualPlan, traiga el recurso asociado
  })
  @JoinColumn({ name: 'recurso_id' })
  resource: Resource;
  */
 @Column()
 recurso: string;

  @Column()
  localidad_id: number;

  @Column()
  tarifa: number;

  @Column()
  moneda_id: number;
  @ManyToOne(() => Currency, (currency) => currency.annualPlans, {
    eager: true, //Para que siempre que se consulte un AnnualPlan, traiga la Moneda asociada
  })
  @JoinColumn({ name: 'moneda_id' })
  currency: Currency;

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

