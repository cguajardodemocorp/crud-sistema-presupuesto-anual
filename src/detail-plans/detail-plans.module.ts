import { Module } from '@nestjs/common';
import { DetailPlansService } from './detail-plans.service';
import { DetailPlansController } from './detail-plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailPlan } from './entities/detail-plan.entity';
import { AnnualPlan } from 'src/annual-plans/entities/annual-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailPlan, AnnualPlan])],
  controllers: [DetailPlansController],
  providers: [DetailPlansService],
})
export class DetailPlansModule {}
