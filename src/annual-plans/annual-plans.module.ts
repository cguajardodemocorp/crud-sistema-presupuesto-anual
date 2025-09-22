import { Module } from '@nestjs/common';
import { AnnualPlansService } from './annual-plans.service';
import { AnnualPlansController } from './annual-plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnualPlan } from './entities/annual-plan.entity';
import { Ceco } from 'src/ceco/entities/ceco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnnualPlan, Ceco])],
  controllers: [AnnualPlansController],
  providers: [AnnualPlansService],
  exports: [TypeOrmModule], //se exporta para ser accedido de otra tabla que tenga dependencia, ej plan annual
})
export class AnnualPlansModule {}
