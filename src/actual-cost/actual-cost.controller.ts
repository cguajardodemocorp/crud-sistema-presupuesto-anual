import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActualCostService } from './actual-cost.service';
import { CreateActualCostDto } from './dto/create-actual-cost.dto';
import { UpdateActualCostDto } from './dto/update-actual-cost.dto';

@Controller('actual-cost')
export class ActualCostController {
  constructor(private readonly actualCostService: ActualCostService) {}

  @Post()
  create(@Body() createActualCostDto: CreateActualCostDto) {
    return this.actualCostService.create(createActualCostDto);
  }

  @Get()
  findAll() {
    return this.actualCostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.actualCostService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateActualCostDto: UpdateActualCostDto) {
    return this.actualCostService.update(id, updateActualCostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.actualCostService.remove(id);
  }
}
