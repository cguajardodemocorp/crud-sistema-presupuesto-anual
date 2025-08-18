import { Injectable } from '@nestjs/common';
import { CreateAnnualPlanDto } from './dto/create-annual-plan.dto';
import { UpdateAnnualPlanDto } from './dto/update-annual-plan.dto';

@Injectable()
export class AnnualPlansService {
  create(createAnnualPlanDto: CreateAnnualPlanDto) {
    return 'This action adds a new annualPlan';
  }

  findAll() {
    return `This action returns all annualPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} annualPlan`;
  }

  update(id: number, updateAnnualPlanDto: UpdateAnnualPlanDto) {
    return `This action updates a #${id} annualPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} annualPlan`;
  }
}
