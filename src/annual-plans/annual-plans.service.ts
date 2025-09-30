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

      // Buscar Razon Social por nombre en lugar de id usando el campo 'razon_social' del DTO de AnnualPlan
      const razonSocialName = (createAnnualPlanDto as any).razon_social;
      const razonSocialEntities = await this.plansRepository.manager.getRepository('CompanyName').find({ where: { nombre: razonSocialName }, withDeleted: true });
      const razonSocialActivo = razonSocialEntities.find(r => !r.deletedAt);
      if (!razonSocialActivo) {
        throw new BadRequestException('No existe una Razon Social activa con el nombre indicado');
      }

      // Buscar Cuenta por nombre en lugar de id usando el campo 'cuenta' del DTO de AnnualPlan
      const accountName = (createAnnualPlanDto as any).cuenta;
      const accountEntities = await this.plansRepository.manager.getRepository('Account').find({ where: { nombre: accountName }, withDeleted: true });
      const accountActivo = accountEntities.find(a => !a.deletedAt);
      if (!accountActivo) {
        throw new BadRequestException('No existe una Cuenta activa con el nombre indicado');
      }

      // Buscar Area por nombre en lugar de id usando el campo 'area' del DTO de AnnualPlan
      const areaName = (createAnnualPlanDto as any).area;
      const areaEntities = await this.plansRepository.manager.getRepository('Area').find({ where: { nombre: areaName }, withDeleted: true });
      const areaActivo = areaEntities.find(a => !a.deletedAt);
      if (!areaActivo) {
        throw new BadRequestException('No existe un Area activa con el nombre indicado');
      }

      // Buscar Recurso por nombre en lugar de id usando el campo 'resource' del DTO de AnnualPlan
      const recursoName = (createAnnualPlanDto as any).resource;
      const recursoEntities = await this.plansRepository.manager.getRepository('Resource').find({ where: { nombre: recursoName }, withDeleted: true });
      const resourceActivo = recursoEntities.find(a => !a.deletedAt);
      if (!resourceActivo) {
        throw new BadRequestException('No existe un Recurso activo con el nombre indicado');
      }

      // Construir el objeto a guardar, usando el id de CECO, País, Moneda, Razon Social y Cuenta en las propiedades 'ceco_id', 'pais_id', 'moneda_id', 'razon_social_id' y 'cuenta_id'
     const { ceco, pais, moneda, razon_social, cuenta, area, resource, ...rest } = createAnnualPlanDto as any;
     const annualPlanData = { ...rest, ceco_id: cecoActivo.id, pais_id: paisActivo.id, moneda_id: currencyActivo.id, razon_social_id: razonSocialActivo.id, cuenta_id: accountActivo.id, area_id: areaActivo.id, recurso_id: resourceActivo.id };
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
    //Validar que el Annual-plan exista y no esté borrado
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

    // Validar y mapear Razon Social si se envía
    if ((updateAnnualPlanDto as any).razon_social) {
      const companyName = (updateAnnualPlanDto as any).razon_social;
      const companyNameEntities = await this.plansRepository.manager.getRepository('Company').find({ where: { nombre: companyName }, withDeleted: true });
      const companyNameActivo = companyNameEntities.find(c => !c.deletedAt);
      if (!companyNameActivo) {
        throw new BadRequestException('No existe Razon social activa con el nombre indicado');
      }
      (updateAnnualPlanDto as any).razon_social_id = companyNameActivo.id;
      delete (updateAnnualPlanDto as any).razon_social;
    }

    // Validar y mapear Cuenta si se envía
    if ((updateAnnualPlanDto as any).cuenta) {
      const account = (updateAnnualPlanDto as any).cuenta;
      const accountEntities = await this.plansRepository.manager.getRepository('Account').find({ where: { nombre: account }, withDeleted: true });
      const accountActivo = accountEntities.find(c => !c.deletedAt);
      if (!accountActivo) {
        throw new BadRequestException('No existe una cuenta activa con el nombre indicado');
      }
      (updateAnnualPlanDto as any).cuenta_id = accountActivo.id;
      delete (updateAnnualPlanDto as any).cuenta;
    }

    // Validar y mapear Area si se envía
    if ((updateAnnualPlanDto as any).area) {
      const area = (updateAnnualPlanDto as any).area;
      const areaEntities = await this.plansRepository.manager.getRepository('Area').find({ where: { nombre: area }, withDeleted: true });
      const areaActivo = areaEntities.find(c => !c.deletedAt);
      if (!areaActivo) {
        throw new BadRequestException('No existe un Area activa con el nombre indicado');
      }
      (updateAnnualPlanDto as any).area_id = areaActivo.id;
      delete (updateAnnualPlanDto as any).area;
    }

    // Validar y mapear Recurso si se envía
    if ((updateAnnualPlanDto as any).recurso) {
      const resource = (updateAnnualPlanDto as any).recurso;
      const resourceEntities = await this.plansRepository.manager.getRepository('Resource').find({ where: { nombre: resource }, withDeleted: true });
      const resourceActivo = resourceEntities.find(c => !c.deletedAt);
      if (!resourceActivo) {
        throw new BadRequestException('No existe un Recurso activo con el nombre indicado');
      }
      (updateAnnualPlanDto as any).recurso_id = resourceActivo.id;
      delete (updateAnnualPlanDto as any).recurso;
    }

    Object.assign(annualPlan, updateAnnualPlanDto);
    return await this.plansRepository.save(annualPlan);
  }

  async remove(id: number) {
    return await this.plansRepository.softDelete({ id });
  }
}
