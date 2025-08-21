import { IsInt } from "class-validator";
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";


@Entity()
export class AnnualPlan {
  //Mapeo concolumnas de la base de datos
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    pais_id: number;

    @Column()
    razon_social_id: number;

    @Column()
    ceco_id: number;

    @Column()
    cuenta_id: number;

    @Column()
    area_id: number;

    @Column()
    recurso_id: number;

    @Column()
    local_id: number;

    @Column()
    tarifa: number;

    @Column()
    moneda_id: number;

    @Column()
    anio: Date;
    
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

    //fecha de soft delete
    @DeleteDateColumn()
    deletedAt: Date;
}

