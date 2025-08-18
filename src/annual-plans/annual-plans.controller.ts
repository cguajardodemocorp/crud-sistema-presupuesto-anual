import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnnualPlansService } from './annual-plans.service';
import { CreateAnnualPlanDto } from './dto/create-annual-plan.dto';
import { UpdateAnnualPlanDto } from './dto/update-annual-plan.dto';

@Controller('annual-plans')
export class AnnualPlansController {
  constructor(private readonly annualPlansService: AnnualPlansService) {}

  @Post()
  create(@Body() createAnnualPlanDto: CreateAnnualPlanDto) {
    return this.annualPlansService.create(createAnnualPlanDto);
  }

  @Get()
  findAll() {
    return this.annualPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.annualPlansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnnualPlanDto: UpdateAnnualPlanDto) {
    return this.annualPlansService.update(+id, updateAnnualPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.annualPlansService.remove(+id);
  }
}
