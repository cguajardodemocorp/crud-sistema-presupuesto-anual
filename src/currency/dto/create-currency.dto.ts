import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
export class CreateCurrencyDto {
    @IsString()
    @IsNotEmpty()
    codigo: string;

    @IsString()
    descripcion: string;
}

