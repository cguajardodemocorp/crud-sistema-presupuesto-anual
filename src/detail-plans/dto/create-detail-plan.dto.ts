import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDetailPlanDto {

    @IsNumber()
    mes: number;
    
    @IsNumber()
    monto: number;
}
