import { Module } from '@nestjs/common';
import { AnnualPlansService } from './annual-plans.service';
import { AnnualPlansController } from './annual-plans.controller';

@Module({
  controllers: [AnnualPlansController],
  providers: [AnnualPlansService],
})
export class AnnualPlansModule {}
