import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CecoService } from './ceco.service';
import { CreateCecoDto } from './dto/create-ceco.dto';
import { UpdateCecoDto } from './dto/update-ceco.dto';

@Controller('ceco')
export class CecoController {
  constructor(private readonly cecoService: CecoService) {}

  @Post()
  create(@Body() createCecoDto: CreateCecoDto) {
    return this.cecoService.create(createCecoDto);
  }

  @Get()
  findAll() {
    return this.cecoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cecoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCecoDto: UpdateCecoDto) {
    return this.cecoService.update(id, updateCecoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cecoService.remove(id);
  }
}
