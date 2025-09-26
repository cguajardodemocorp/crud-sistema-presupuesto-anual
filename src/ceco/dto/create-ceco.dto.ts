import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
export class CreateCecoDto {
    @IsString()
    @IsNotEmpty()
    codigo: string;

    @IsString()
    descripcion: string;
}
