import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyNameService } from './company-name.service';
import { CreateCompanyNameDto } from './dto/create-company-name.dto';
import { UpdateCompanyNameDto } from './dto/update-company-name.dto';

@Controller('company-name')
export class CompanyNameController {
  constructor(private readonly companyNameService: CompanyNameService) {}

  @Post()
  create(@Body() createCompanyNameDto: CreateCompanyNameDto) {
    return this.companyNameService.create(createCompanyNameDto);
  }

  @Get()
  findAll() {
    return this.companyNameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.companyNameService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCompanyNameDto: UpdateCompanyNameDto) {
    return this.companyNameService.update(id, updateCompanyNameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.companyNameService.remove(id);
  }
}
