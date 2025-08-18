import { Module } from '@nestjs/common';
import { AnnualPlansModule } from './annual-plans/annual-plans.module';

@Module({
  imports: [AnnualPlansModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
