import { Module } from '@nestjs/common';
import { DetailPlansService } from './detail-plans.service';
import { DetailPlansController } from './detail-plans.controller';

@Module({
  controllers: [DetailPlansController],
  providers: [DetailPlansService],
})
export class DetailPlansModule {}
