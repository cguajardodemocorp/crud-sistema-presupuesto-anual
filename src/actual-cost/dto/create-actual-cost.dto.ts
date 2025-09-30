import { Type } from "class-transformer";
import { IsInt, IsNumber, IsDate, IsIn, IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateActualCostDto {
//Validaciones de tipo de dato
    //Validacion para que no sea nulo
    @IsString()
    @IsNotEmpty()
    pais: string; //Se recibe el valor de la columna nombre de la tabla Pais y se valida por id en el service

    @IsString()
    @IsNotEmpty()
    razon_social: string; //Se recibe el valor de la columna nombre de la tabla RazonSocial y se valida por id en el service

    @IsString()
    @IsNotEmpty()
    ceco: string; //Se recibe el valor de la columna code de la tabla Ceco y se valida por id en el service

    @IsString()
    @IsNotEmpty()
    cuenta: string; //Se recibe el valor de la columna nombre de la tabla Cuenta y se valida por id en el service

    @IsNumber()
    @IsNotEmpty()
    monto: number;

    @IsString()
    @IsNotEmpty()
    moneda: string; //Se recibe el valor de la columna code de la tabala Ceco y se valida por id en el service

    @IsString()
    @IsNotEmpty()
    glosa: string;

    @IsInt()
    @IsNotEmpty()
    anio: number;

    @IsInt()
    @IsNotEmpty()
    mes: number;

    @IsInt()
    @IsNotEmpty()
    usuario_id: number;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    fecha_carga: Date;

}
