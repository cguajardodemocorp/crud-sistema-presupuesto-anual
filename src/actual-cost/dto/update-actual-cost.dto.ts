import { PartialType } from '@nestjs/mapped-types';
import { CreateActualCostDto } from './create-actual-cost.dto';

export class UpdateActualCostDto extends PartialType(CreateActualCostDto) {}
