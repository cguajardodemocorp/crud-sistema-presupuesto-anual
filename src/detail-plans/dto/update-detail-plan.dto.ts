import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailPlanDto } from './create-detail-plan.dto';

export class UpdateDetailPlanDto extends PartialType(CreateDetailPlanDto) {}
