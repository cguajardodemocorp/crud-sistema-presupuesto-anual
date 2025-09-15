import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDetailPlanDto {
  @IsNumber()
  annualPlanId: number; // id del AnnualPlan

  @IsNumber()
  mes: number;

  @IsNumber()
  monto: number;
}
