import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";
export class CreateCecoDto {
    @IsString()
    codigo: string;
}
