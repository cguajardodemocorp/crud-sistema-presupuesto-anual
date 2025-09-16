import { Injectable } from '@nestjs/common';
import { CreateCompanyNameDto } from './dto/create-company-name.dto';
import { UpdateCompanyNameDto } from './dto/update-company-name.dto';

@Injectable()
export class CompanyNameService {
  create(createCompanyNameDto: CreateCompanyNameDto) {
    return 'This action adds a new companyName';
  }

  findAll() {
    return `This action returns all companyName`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyName`;
  }

  update(id: number, updateCompanyNameDto: UpdateCompanyNameDto) {
    return `This action updates a #${id} companyName`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyName`;
  }
}
