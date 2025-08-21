import { IsDate, IsIn, IsInt, IsNumber, IsOptional } from "class-validator";


export class CreateAnnualPlanDto {
    //Validaciones de tipo de dato
    //Validacion para que no sea nulo
    @IsInt()
    pais_id: number;

    @IsInt()
    razon_social_id: number;

    @IsInt()
    ceco_id: number;

    @IsInt()
    cuenta_id: number;

    @IsInt()
    area_id: number;

    @IsInt()
    recurso_id: number;

    @IsInt()
    local_id: number;

    @IsNumber()
    tarifa: number;

    @IsInt()
    moneda_id: number;

    @IsDate()
    anio: Date;

    @IsInt()
    usuario_id: number;

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
