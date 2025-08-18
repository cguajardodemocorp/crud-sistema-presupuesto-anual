import { IsInt, IsNumber } from "class-validator";


export class CreateAnnualPlanDto {
    //Validaciones de tipo de dato
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
}
