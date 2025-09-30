import { Module } from '@nestjs/common';
import { ActualCostService } from './actual-cost.service';
import { ActualCostController } from './actual-cost.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActualCost } from './entities/actual-cost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActualCost])],
  controllers: [ActualCostController],
  providers: [ActualCostService],
  exports: [TypeOrmModule], //se exporta para ser accedido de otra tabla que tenga dependencia
})
export class ActualCostModule {}
