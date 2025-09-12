import { Injectable } from '@nestjs/common';
import { CreateAnnualPlanDto } from './dto/create-annual-plan.dto';
import { UpdateAnnualPlanDto } from './dto/update-annual-plan.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnualPlan } from './entities/annual-plan.entity';
import { DetailPlan } from 'src/detail-plans/entities/detail-plan.entity';


@Injectable()
export class AnnualPlansService {
  //se usa patron de diseño de repository para interactuar con la bd
  constructor(
    @InjectRepository(AnnualPlan)
    private readonly plansRepository: Repository<AnnualPlan>,

  ) {}

  async create(createAnnualPlanDto: CreateAnnualPlanDto) {

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
   // return await this.plansRepository.update( id , updateAnnualPlanDto);
   return `This action updates a annualPlan`;
  }

  async remove(id: number) {
    return await this.plansRepository.softDelete({ id });
  }
}
