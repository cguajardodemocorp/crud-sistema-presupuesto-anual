import { Injectable } from '@nestjs/common';
import { CreateDetailPlanDto } from './dto/create-detail-plan.dto';
import { UpdateDetailPlanDto } from './dto/update-detail-plan.dto';
import { DetailPlan } from './entities/detail-plan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { AnnualPlan } from 'src/annual-plans/entities/annual-plan.entity';

@Injectable()
export class DetailPlansService {
  constructor(
    @InjectRepository(DetailPlan)
    private readonly detailPlanRepository: Repository<DetailPlan>,

    @InjectRepository(AnnualPlan)
    private readonly plansRepository: Repository<AnnualPlan>,
  ) {}

  async create(createDetailPlanDto: CreateDetailPlanDto) {

    const annualPlan = this.plansRepository.findOneBy({ id: createDetailPlanDto.annualPlanId });
    return await this.detailPlanRepository.save(createDetailPlanDto);
  }

  async findAll() {
    return await this.detailPlanRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} detailPlan`;
  }

  async update(id: number, updateDetailPlanDto: UpdateDetailPlanDto) {
    return `This action updates a #${id} detailPlan`;
  }

  async remove(id: number) {
    return `This action removes a #${id} detailPlan`;
  }
}
