import { Module } from '@nestjs/common';
import { AnnualPlansService } from './annual-plans.service';
import { AnnualPlansController } from './annual-plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnualPlan } from './entities/annual-plan.entity';
import { DetailPlansService } from 'src/detail-plans/detail-plans.service';
import { DetailPlansModule } from 'src/detail-plans/detail-plans.module';

@Module({
  imports: [TypeOrmModule.forFeature([AnnualPlan]), DetailPlansModule],
  controllers: [AnnualPlansController],
  providers: [AnnualPlansService, DetailPlansService],
})
export class AnnualPlansModule {}
