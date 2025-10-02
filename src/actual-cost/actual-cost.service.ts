import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateActualCostDto } from './dto/create-actual-cost.dto';
import { UpdateActualCostDto } from './dto/update-actual-cost.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActualCost } from './entities/actual-cost.entity';

@Injectable()
export class ActualCostService {
  //se usa patron de diseño de repository para manejar la entidades
  constructor(
    @InjectRepository(ActualCost)
    private readonly actualCostRepository: Repository<ActualCost>,
  ) { }

  async create(createActualCostDto: CreateActualCostDto) {
    try {

      // Buscar País por nombre en lugar de id usando el campo 'pais' del DTO de ActualCost
      const paisName = (createActualCostDto as any).pais;
      const paisEntities = await this.actualCostRepository.manager.getRepository('Country').find({ where: { nombre: paisName }, withDeleted: true });
      const paisActivo = paisEntities.find(p => !p.deletedAt);
      if (!paisActivo) {
        throw new BadRequestException('No existe un país activo con el nombre indicado');
      }

      // Buscar Razon Social por nombre en lugar de id usando el campo 'razon_social' del DTO de ActualCost
      const razonSocialName = (createActualCostDto as any).razon_social;
      const razonSocialEntities = await this.actualCostRepository.manager.getRepository('CompanyName').find({ where: { nombre: razonSocialName }, withDeleted: true });
      const razonSocialActivo = razonSocialEntities.find(r => !r.deletedAt);
      if (!razonSocialActivo) {
        throw new BadRequestException('No existe una Razon Social activa con el nombre indicado');
      }

      // Buscar CECO por código usando el campo 'ceco' del DTO
      const cecoCode = (createActualCostDto as any).ceco;
      const cecoEntities = await this.actualCostRepository.manager.getRepository('Ceco').find({ where: { codigo: cecoCode }, withDeleted: true });
      const cecoActivo = cecoEntities.find(c => !c.deletedAt);
      if (!cecoActivo) {
        throw new BadRequestException('No existe un CECO activo con el código indicado');
      }

      // Buscar Cuenta por nombre en lugar de id usando el campo 'cuenta' del DTO de ActualCost
      const accountName = (createActualCostDto as any).cuenta;
      const accountEntities = await this.actualCostRepository.manager.getRepository('Account').find({ where: { nombre: accountName }, withDeleted: true });
      const accountActivo = accountEntities.find(a => !a.deletedAt);
      if (!accountActivo) {
        throw new BadRequestException('No existe una Cuenta activa con el nombre indicado');
      }

      // Buscar Moneda por codigo en lugar de id usando el campo 'moneda' del DTO de AnnualPlan
      const currencyCode = (createActualCostDto as any).moneda;
      const currencyEntities = await this.actualCostRepository.manager.getRepository('Currency').find({ where: { codigo: currencyCode }, withDeleted: true });
      const currencyActivo = currencyEntities.find(c => !c.deletedAt);
      if (!currencyActivo) {
        throw new BadRequestException('No existe una moneda activa con el código indicado');
      }

    // Construir el objeto a guardar, usando el id 
     const { pais, razon_social, ceco, cuenta, moneda, ...rest } = createActualCostDto as any; 
     const actualCostData = { ...rest, pais_id: paisActivo.id, razon_social_id: razonSocialActivo.id, ceco_id: cecoActivo.id, cuenta_id: accountActivo.id, moneda_id: currencyActivo.id }; 
     const actualCost = this.actualCostRepository.create(actualCostData);
     return await this.actualCostRepository.save(actualCost);

    } catch (error) {
      console.error('Error creating ActualCost:', error);
      throw error;
    }

  }

  async findAll() {
    return await this.actualCostRepository.find();
  }

  async findOne(id: number) {
    const actualCost = await this.actualCostRepository.findOne({ where: { id }, withDeleted: true });
    if (!actualCost) {
      throw new BadRequestException('ActualCost not found');
    }
    if (actualCost.deletedAt) {
      throw new BadRequestException('ActualCost deleted');
    }
    return actualCost;
  }

  async update(id: number, updateActualCostDto: UpdateActualCostDto) {
    //Validar que el actual-cost exista y no esté borrado
    const actualCost = await this.actualCostRepository.findOne({ where: { id }, withDeleted: true });
    if (!actualCost) {
      throw new BadRequestException('ActualCost not found');
    }
    if (actualCost.deletedAt) {
      throw new BadRequestException('ActualCost deleted');
    }

    // Validar y mapear País si se envía
    if ((updateActualCostDto as any).pais) {
      const paisName = (updateActualCostDto as any).pais;
      const paisEntities = await this.actualCostRepository.manager.getRepository('Country').find({ where: { nombre: paisName }, withDeleted: true });
      const paisActivo = paisEntities.find(p => !p.deletedAt);
      if (!paisActivo) {
        throw new BadRequestException('No existe un país activo con el nombre indicado');
      }
      (updateActualCostDto as any).pais_id = paisActivo.id;
      delete (updateActualCostDto as any).pais;
    }

    // Validar y mapear Razon Social por nombre si se envía
    if ((updateActualCostDto as any).razon_social) {
      const companyName = (updateActualCostDto as any).razon_social;
      const companyNameEntities = await this.actualCostRepository.manager.getRepository('CompanyName').find({ where: { nombre: companyName }, withDeleted: true });
      const companyNameActivo = companyNameEntities.find(c => !c.deletedAt);
      if (!companyNameActivo) {
        throw new BadRequestException('No existe Razon social activa con el nombre indicado');
      }
      (updateActualCostDto as any).razon_social_id = companyNameActivo.id;
      delete (updateActualCostDto as any).razon_social;
    }

    // Validar y mapear CECO si se envía
    if ((updateActualCostDto as any).ceco) {
      const cecoCode = (updateActualCostDto as any).ceco;
      const cecoEntities = await this.actualCostRepository.manager.getRepository('Ceco').find({ where: { codigo: cecoCode }, withDeleted: true });
      const cecoActivo = cecoEntities.find(c => !c.deletedAt);
      if (!cecoActivo) {
        throw new BadRequestException('No existe un CECO activo con el código indicado');
      }
      (updateActualCostDto as any).ceco_id = cecoActivo.id;
      delete (updateActualCostDto as any).ceco;
    }

    // Validar y mapear Cuenta si se envía
    if ((updateActualCostDto as any).cuenta) {
      const account = (updateActualCostDto as any).cuenta;
      const accountEntities = await this.actualCostRepository.manager.getRepository('Account').find({ where: { nombre: account }, withDeleted: true });
      const accountActivo = accountEntities.find(c => !c.deletedAt);
      if (!accountActivo) {
        throw new BadRequestException('No existe una cuenta activa con el nombre indicado');
      }
      (updateActualCostDto as any).cuenta_id = accountActivo.id;
      delete (updateActualCostDto as any).cuenta;
    }

    // Validar y mapear Moneda  segun codigo si se envía
    if ((updateActualCostDto as any).moneda) {
      const currencyCode = (updateActualCostDto as any).moneda;
      const currencyEntities = await this.actualCostRepository.manager.getRepository('Currency').find({ where: { codigo: currencyCode }, withDeleted: true });
      const currencyActivo = currencyEntities.find(c => !c.deletedAt);
      if (!currencyActivo) {
        throw new BadRequestException('No existe una moneda activa con el código indicado');
      }
      (updateActualCostDto as any).moneda_id = currencyActivo.id;
      delete (updateActualCostDto as any).moneda;
    }

    Object.assign(actualCost, updateActualCostDto);
    return await this.actualCostRepository.save(actualCost);

  }

  async remove(id: number) {
    return await this.actualCostRepository.softDelete({ id });
  }
}
