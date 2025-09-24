import { Injectable, BadRequestException } from '@nestjs/common';
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
      // Buscar CECO por código usando el campo 'ceco' del DTO
      const cecoCode = (createAnnualPlanDto as any).ceco;
      const cecoEntity = await this.plansRepository.manager.getRepository('Ceco').findOne({ where: { codigo: cecoCode }, withDeleted: true });
      if (!cecoEntity) {
        throw new BadRequestException('No existe el CECO indicado');
      }
      if (cecoEntity.deletedAt) {
        throw new BadRequestException('El CECO está borrado');
      }
      // Construir el objeto a guardar, usando el id de CECO en la propiedad 'ceco_id'
      const { ceco, ...rest } = createAnnualPlanDto as any;
      const annualPlanData = { ...rest, ceco_id: cecoEntity.id };// Se elimina el ceco del request y se añade ceco_id
      const annualPlan = this.plansRepository.create(annualPlanData);
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
    const annualPlan = await this.plansRepository.findOne({ where: { id }, withDeleted: true });
    if (!annualPlan) {
      throw new BadRequestException('AnnualPlan not found');
    }
    if (annualPlan.deletedAt) {
      throw new BadRequestException('AnnualPlan deleted');
    }
    return annualPlan;
  }

  async update(id: number, updateAnnualPlanDto: UpdateAnnualPlanDto) {
    const annualPlan = await this.plansRepository.findOne({ where: { id }, withDeleted: true });
    if (!annualPlan) {
      throw new BadRequestException('AnnualPlan not found');
    }
    if (annualPlan.deletedAt) {
      throw new BadRequestException('AnnualPlan deleted');
    }
    Object.assign(annualPlan, updateAnnualPlanDto);
    return await this.plansRepository.save(annualPlan);
  }

  async remove(id: number) {
    return await this.plansRepository.softDelete({ id });
  }
}
