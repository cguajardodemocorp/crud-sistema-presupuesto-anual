import { Module } from '@nestjs/common';
import { DetailPlansService } from './detail-plans.service';
import { DetailPlansController } from './detail-plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailPlan } from './entities/detail-plan.entity';
import {AnnualPlansService} from 'src/annual-plans/annual-plans.service';
import { AnnualPlansModule } from 'src/annual-plans/annual-plans.module';



@Module({
  imports: [TypeOrmModule.forFeature([DetailPlan]), AnnualPlansModule],
  controllers: [DetailPlansController],
  providers: [DetailPlansService, AnnualPlansService],
  exports: [], 
})
export class DetailPlansModule {}
