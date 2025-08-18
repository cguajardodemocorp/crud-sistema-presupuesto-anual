import { Module } from '@nestjs/common';
import { AnnualPlansService } from './annual-plans.service';
import { AnnualPlansController } from './annual-plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnualPlan } from './entities/annual-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnnualPlan])],
  controllers: [AnnualPlansController],
  providers: [AnnualPlansService],
})
export class AnnualPlansModule {}
