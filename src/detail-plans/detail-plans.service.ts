import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnualPlan } from 'src/annual-plans/entities/annual-plan.entity';
import { Repository } from 'typeorm';
import { CreateDetailPlanDto } from './dto/create-detail-plan.dto';
import { UpdateDetailPlanDto } from './dto/update-detail-plan.dto';
import { DetailPlan } from './entities/detail-plan.entity';


@Injectable()
export class DetailPlansService {
  constructor(
    @InjectRepository(DetailPlan)
    private readonly detailPlanRepository: Repository<DetailPlan>,

    @InjectRepository(AnnualPlan)
    private readonly plansRepository: Repository<AnnualPlan>,
  ) {}

  async create(createDetailPlanDto: CreateDetailPlanDto) {
    // Buscar el AnnualPlan por id
    const annualPlan = await this.plansRepository.findOneBy({
      id: createDetailPlanDto.annualPlanId,
    });

    if (!annualPlan) {
      throw new BadRequestException('AnnualPlan not found');
    }

    // Crear el DetailPlan asociando el AnnualPlan encontrado
    const detailPlan = this.detailPlanRepository.create({
      mes: createDetailPlanDto.mes,
      monto: createDetailPlanDto.monto,
      annualPlan: annualPlan,
    });
    return await this.detailPlanRepository.save(detailPlan);
  }

  async findAll() {
    return await this.detailPlanRepository.find();
  }

  async findOne(id: number) {
    const detailPlan = await this.detailPlanRepository.findOne({ where: { id }, withDeleted: true });
    if (!detailPlan) {
      throw new BadRequestException('DetailPlan not found');
    }
    if (detailPlan.deletedAt) {
      throw new BadRequestException('DetailPlan Deleted');
    }
    return detailPlan;
  }

  async update(id: number, updateDetailPlanDto: UpdateDetailPlanDto) {
    const detailPlan = await this.detailPlanRepository.findOneBy({ id });

    if (!detailPlan) {
      throw new BadRequestException('DetailPlan not found');
    }

    let annualPlan = detailPlan.annualPlan;
    if (updateDetailPlanDto.annualPlanId) {
      const foundPlan = await this.plansRepository.findOneBy({ id: updateDetailPlanDto.annualPlanId });
      if (!foundPlan) {
        throw new BadRequestException('AnnualPlan not found');
      }
      annualPlan = foundPlan;
    }

    return await this.detailPlanRepository.save({
      ...detailPlan,
      ...updateDetailPlanDto,
      annualPlan,
    });
  }

  async remove(id: number) {
    return await this.detailPlanRepository.softDelete({ id });
  }
}
