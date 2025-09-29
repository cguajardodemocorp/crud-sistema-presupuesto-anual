import { Type } from "class-transformer";
import { IsInt, IsNumber, IsDate, IsIn, IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateAnnualPlanDto {
    //Validaciones de tipo de dato
    //Validacion para que no sea nulo
    @IsString()
    @IsNotEmpty()
    pais: string; //Se recibe el valor de la columna nombre de la tabla Pais y se valdia por id en el service

    @IsString()
    @IsNotEmpty()
    razon_social: string; //Se recibe el valor de la columna nombre de la tabla RazonSocial y se valdia por id en el service

    @IsString()
    @IsNotEmpty()
    ceco: string; //Se recibe el valor de la columna code de la tabla Ceco y se valdia por id en el service

    @IsString()
    @IsNotEmpty()
    cuenta: string; //Se recibe el valor de la columna nombre de la tabla Cuenta y se valdia por id en el service

    @IsInt()
    @IsNotEmpty()
    area_id: number;

    @IsInt()
    @IsNotEmpty()
    recurso_id: number;

    @IsInt()
    @IsNotEmpty()
    localidad_id: number;

    @IsNumber()
    @IsNotEmpty()
    tarifa: number;

    @IsString()
    @IsNotEmpty()
    moneda: string; //Se recibe el valor de la columna code de la tabala Ceco y se valdia por id en el service

    @IsInt()
    @IsNotEmpty()
    anio: number;

    @IsInt()
    @IsNotEmpty()
    usuario_id: number;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    fecha_carga: Date;

    @IsIn(['NORMAL', 'CONFIDENCIAL'])
    tipo_carga?: 'NORMAL' | 'CONFIDENCIAL';

    @IsInt()
    @IsNotEmpty()
    mes: number;

    @IsInt()
    @IsNotEmpty()
    cantidad: number;

}
