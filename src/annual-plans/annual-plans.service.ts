import { Injectable, BadRequestException } from '@nestjs/common';
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

  ) {}

  async create(createAnnualPlanDto: CreateAnnualPlanDto) {
    try {
      // Buscar CECO por código usando el campo 'ceco' del DTO
      const cecoCode = (createAnnualPlanDto as any).ceco;
      const cecoEntities = await this.plansRepository.manager.getRepository('Ceco').find({ where: { codigo: cecoCode }, withDeleted: true });
      const cecoActivo = cecoEntities.find(c => !c.deletedAt);
      if (!cecoActivo) {
        throw new BadRequestException('No existe un CECO activo con el código indicado');
      }

      // Buscar País por nombre en lugar de id usando el campo 'pais' del DTO de AnnualPlan
      const paisName = (createAnnualPlanDto as any).pais;
      const paisEntities = await this.plansRepository.manager.getRepository('Country').find({ where: { nombre: paisName }, withDeleted: true });
      const paisActivo = paisEntities.find(p => !p.deletedAt);
      if (!paisActivo) {
        throw new BadRequestException('No existe un país activo con el nombre indicado');
      }

      // Buscar Moneda por codigo en lugar de id usando el campo 'moneda' del DTO de AnnualPlan
      const currencyCode = (createAnnualPlanDto as any).moneda;
      const currencyEntities = await this.plansRepository.manager.getRepository('Currency').find({ where: { codigo: currencyCode }, withDeleted: true });
      const currencyActivo = currencyEntities.find(c => !c.deletedAt);
      if (!currencyActivo) {
        throw new BadRequestException('No existe una moneda activa con el código indicado');
      }

      // Construir el objeto a guardar, usando el id de CECO y País en las propiedades 'ceco_id' y 'pais_id'
     const { ceco, pais, moneda, ...rest } = createAnnualPlanDto as any;
     const annualPlanData = { ...rest, ceco_id: cecoActivo.id, pais_id: paisActivo.id, moneda_id: currencyActivo.id };
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

    // Validar y mapear CECO si se envía
    if ((updateAnnualPlanDto as any).ceco) {
      const cecoCode = (updateAnnualPlanDto as any).ceco;
      const cecoEntities = await this.plansRepository.manager.getRepository('Ceco').find({ where: { codigo: cecoCode }, withDeleted: true });
      const cecoActivo = cecoEntities.find(c => !c.deletedAt);
      if (!cecoActivo) {
        throw new BadRequestException('No existe un CECO activo con el código indicado');
      }
      (updateAnnualPlanDto as any).ceco_id = cecoActivo.id;
      delete (updateAnnualPlanDto as any).ceco;
    }

    // Validar y mapear País si se envía
    if ((updateAnnualPlanDto as any).pais) {
      const paisName = (updateAnnualPlanDto as any).pais;
      const paisEntities = await this.plansRepository.manager.getRepository('Country').find({ where: { nombre: paisName }, withDeleted: true });
      const paisActivo = paisEntities.find(p => !p.deletedAt);
      if (!paisActivo) {
        throw new BadRequestException('No existe un país activo con el nombre indicado');
      }
      (updateAnnualPlanDto as any).pais_id = paisActivo.id;
      delete (updateAnnualPlanDto as any).pais;
    }

    // Validar y mapear Moneda si se envía
    if ((updateAnnualPlanDto as any).moneda) {
      const currencName = (updateAnnualPlanDto as any).moneda;
      const currencyEntities = await this.plansRepository.manager.getRepository('Currency').find({ where: { nombre: currencName }, withDeleted: true });
      const currencyActivo = currencyEntities.find(c => !c.deletedAt);
      if (!currencyActivo) {
        throw new BadRequestException('No existe una moneda activa con el nombre indicado');
      }
      (updateAnnualPlanDto as any).moneda_id = currencyActivo.id;
      delete (updateAnnualPlanDto as any).moneda;
    }

    Object.assign(annualPlan, updateAnnualPlanDto);
    return await this.plansRepository.save(annualPlan);
  }

  async remove(id: number) {
    return await this.plansRepository.softDelete({ id });
  }
}
