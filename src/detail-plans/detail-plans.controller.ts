import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailPlansService } from './detail-plans.service';
import { CreateDetailPlanDto } from './dto/create-detail-plan.dto';
import { UpdateDetailPlanDto } from './dto/update-detail-plan.dto';

@Controller('detail-plans')
export class DetailPlansController {
  constructor(private readonly detailPlansService: DetailPlansService) {}

  @Post()
  create(@Body() createDetailPlanDto: CreateDetailPlanDto) {
    return this.detailPlansService.create(createDetailPlanDto);
  }

  @Get()
  findAll() {
    return this.detailPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailPlansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailPlanDto: UpdateDetailPlanDto) {
    return this.detailPlansService.update(+id, updateDetailPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailPlansService.remove(+id);
  }
}
