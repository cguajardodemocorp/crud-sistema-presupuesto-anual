import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
export class CreateCountryDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
}
