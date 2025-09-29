import { Module } from '@nestjs/common';
import { CompanyNameService } from './company-name.service';
import { CompanyNameController } from './company-name.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyName } from './entities/company-name.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyName])],
  controllers: [CompanyNameController],
  providers: [CompanyNameService],
  exports: [TypeOrmModule], // Exporta si otro módulo necesita acceder a CompanyName
})
export class CompanyNameModule {}
