import { Module } from '@nestjs/common';
import { CompanyNameService } from './company-name.service';
import { CompanyNameController } from './company-name.controller';

@Module({
  controllers: [CompanyNameController],
  providers: [CompanyNameService],
})
export class CompanyNameModule {}
