import { Module } from '@nestjs/common';
import { ActualCostService } from './actual-cost.service';
import { ActualCostController } from './actual-cost.controller';

@Module({
  controllers: [ActualCostController],
  providers: [ActualCostService],
})
export class ActualCostModule {}
