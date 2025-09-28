import { Type } from "class-transformer";
import { IsInt } from "class-validator";
import { IsNumber } from "class-validator";
import { IsDate } from "class-validator";
import { IsOptional } from "class-validator";
import { IsIn} from "class-validator";
import { IsString } from "class-validator";

export class CreateAnnualPlanDto {
    //Validaciones de tipo de dato
    //Validacion para que no sea nulo
    @IsString()
    pais: string; //Se recibe el valor de la columna nombre de la tabla Pais y se valdia por id en el service

    @IsInt()
    razon_social_id: number;

    @IsString()
    ceco: string; //Se recibe el valor de la columna code de la tabala Ceco y se valdia por id en el service

    @IsInt()
    cuenta_id: number;

    @IsInt()
    area_id: number;

    @IsInt()
    recurso_id: number;

    @IsInt()
    localidad_id: number;

    @IsNumber()
    tarifa: number;

    @IsString()
    moneda: string; //Se recibe el valor de la columna code de la tabala Ceco y se valdia por id en el service

    @IsInt()
    anio: number;

    @IsInt()
    usuario_id: number;

    @Type(() => Date)
    @IsDate()
    fecha_carga: Date;

    @IsOptional()
    @IsIn(['NORMAL', 'CONFIDENCIAL'])
    tipo_carga?: 'NORMAL' | 'CONFIDENCIAL';

    @IsInt()
    mes: number;

    @IsInt()
    cantidad: number;

}
