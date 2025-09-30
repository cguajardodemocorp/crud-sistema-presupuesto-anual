import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { Exclude } from 'class-transformer';
import { Country } from "src/country/entities/country.entity";
import { CompanyName } from "src/company-name/entities/company-name.entity";
import { Ceco } from "src/ceco/entities/ceco.entity";
import { Account } from "src/account/entities/account.entity";
import { Currency } from "src/currency/entities/currency.entity";


@Entity('gasto_real')
export class ActualCost {
    //Mapeo concolumnas de la base de datos
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    pais_id: number
    @ManyToOne(() => Country, (country) => country.actualCosts, {
        eager: true, //Para que siempre que se consulte un ActualCost, traiga el País asociado
    })
    @JoinColumn({ name: 'pais_id' })
    country: Country;

    @Column()
    razon_social_id: number
    @ManyToOne(() => CompanyName, (companyName) => companyName.actualCosts, {
        eager: true, //Para que siempre que se consulte un ActualCost, traiga la Razon Social asociada
    })
    @JoinColumn({ name: 'razon_social_id' })
    companyName: CompanyName;

    @Column()
    ceco_id: number
    @ManyToOne(() => Ceco, (ceco) => ceco.actualCosts, {
        eager: true, //Para que siempre que se consulte un ActualCost, traiga el Ceco asociado
    })
    @JoinColumn({ name: 'ceco_id' })
    ceco: Ceco;

    @Column()
    cuenta_id: number
    @ManyToOne(() => Account, (account) => account.actualCosts, {
        eager: true, //Para que siempre que se consulte un ActualCost, traiga la Cuenta asociada
    })
    @JoinColumn({ name: 'cuenta_id' })
    account: Account;

    @Column()
    monto: number;

    @Column()
    moneda_id: number
    @ManyToOne(() => Currency, (currency) => currency.actualCosts, {
        eager: true, //Para que siempre que se consulte un ActualCost, traiga la Moneda asociada
    })
    @JoinColumn({ name: 'moneda_id' })
    currency: Currency;

    @Column()
    glosa: string;

    @Column()
    anio: number;

    @Column()
    mes: number;

    @Column()
    usuario_id: number;

    @Column({ type: 'timestamp' })
    fecha_carga: Date;

      //fecha de soft delete
    @Exclude()
     @DeleteDateColumn()
     deletedAt: Date;

}
