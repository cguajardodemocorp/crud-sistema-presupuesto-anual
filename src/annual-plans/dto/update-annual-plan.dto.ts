import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnualPlanDto } from './create-annual-plan.dto';

export class UpdateAnnualPlanDto extends PartialType(CreateAnnualPlanDto) {}
