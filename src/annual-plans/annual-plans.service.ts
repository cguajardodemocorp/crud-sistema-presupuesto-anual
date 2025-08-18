import { Injectable } from '@nestjs/common';
import { CreateAnnualPlanDto } from './dto/create-annual-plan.dto';
import { UpdateAnnualPlanDto } from './dto/update-annual-plan.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnualPlan } from './entities/annual-plan.entity';

@Injectable()
export class AnnualPlansService {
  //se usa patron de diseño de repository para interactuar con la bd

  constructor(
    @InjectRepository(AnnualPlan)
    private readonly plansRepository: Repository<AnnualPlan>,
  ) { }

  async create(createAnnualPlanDto: CreateAnnualPlanDto) {
    //return `This action adds a annualPlan`;
    try {
      const annualPlan = this.plansRepository.create(createAnnualPlanDto);
      return await this.plansRepository.save(annualPlan);
    } catch (error) {
      console.error('Error creating annual plan:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.plansRepository.find();
  }

  async findOne(id: number) {
    return await this.plansRepository.findOneBy({ id });
  }

  async update(id: number, updateAnnualPlanDto: UpdateAnnualPlanDto) {
    return await this.plansRepository.update( id , updateAnnualPlanDto);
  }

  async remove(id: number) {
    return await this.plansRepository.softDelete({ id });
  }
}
