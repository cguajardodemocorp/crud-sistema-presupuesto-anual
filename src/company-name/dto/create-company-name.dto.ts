import { IsNotEmpty, IsString } from "class-validator";
export class CreateCompanyNameDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;   
}
