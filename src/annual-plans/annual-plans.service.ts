import { Injectable } from '@nestjs/common';
import { CreateAnnualPlanDto } from './dto/create-annual-plan.dto';
import { UpdateAnnualPlanDto } from './dto/update-annual-plan.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnualPlan } from './entities/annual-plan.entity';

@Injectable()
export class AnnualPlansService {

  constructor(
    @InjectRepository(AnnualPlan)
    private readonly plansRepository: Repository<AnnualPlan>,
  ) {}

  async create(createAnnualPlanDto: CreateAnnualPlanDto) {
    //return `This action adds a annualPlan`;
    const annualPlan = this.plansRepository.create(createAnnualPlanDto);
    return await this.plansRepository.save(annualPlan);
  }

  async findAll() {
    return await this.plansRepository.find(); 
  }

  async findOne(id: number) {
    return `This action returns a #${id} annualPlan`;
  }

  async update(id: number, updateAnnualPlanDto: UpdateAnnualPlanDto) {
    return `This action updates a #${id} annualPlan`;
  }

  async remove(id: number) {
    return `This action removes a #${id} annualPlan`;
  }
}
