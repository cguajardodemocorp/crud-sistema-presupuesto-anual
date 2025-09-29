import { Injectable } from '@nestjs/common';
import { CreateCompanyNameDto } from './dto/create-company-name.dto';
import { UpdateCompanyNameDto } from './dto/update-company-name.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { CompanyName } from './entities/company-name.entity';


@Injectable()
export class CompanyNameService {
  constructor(
    @InjectRepository(CompanyName)
    private readonly companyNameRepository: Repository<CompanyName>,
  ) { }

  async create(createCompanyNameDto: CreateCompanyNameDto) {
    try {
      // Permitir crear solo si todos los razon social con ese mismo nombre están borrados en otros ID
      const razonSocialConNombre = await this.companyNameRepository.find({ where: { nombre: createCompanyNameDto.nombre }, withDeleted: true });
      const algunoActivo = razonSocialConNombre.some(c => !c.deletedAt);
      if (algunoActivo) {
        throw new BadRequestException('El nombre de razon social ya existe y está activo');
      }
      const razonSocial = this.companyNameRepository.create(createCompanyNameDto);
      return await this.companyNameRepository.save(razonSocial);
    } catch (error) {
      console.error('Error creando razon social:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.companyNameRepository.find();
  }

  async findOne(id: number) {
    const companyName = await this.companyNameRepository.findOne({ where: { id }, withDeleted: true });
    if (!companyName) {
      throw new BadRequestException('Company name not found');
    }
    if (companyName.deletedAt) {
      throw new BadRequestException('Company name deleted');
    }
    return companyName;
  }

  async update(id: number, updateCompanyNameDto: UpdateCompanyNameDto) {
    try {
      const companyName = await this.companyNameRepository.findOne({ where: { id }, withDeleted: true });
      if (!companyName) {
        throw new BadRequestException('Company name not found');
      }
      if (companyName.deletedAt) {
        throw new BadRequestException('Company name deleted');
      }
      // Validar que el nuevo código no exista en otro registro
      if (updateCompanyNameDto.nombre) {
        const exists = await this.companyNameRepository.findOne({ where: { nombre: updateCompanyNameDto.nombre } });
        if (exists && exists.id !== id) {
          throw new BadRequestException('Razon social ya existe en otro registro');
        }
      }
      Object.assign(companyName, updateCompanyNameDto);
      return await this.companyNameRepository.save(companyName);
    } catch (error) {
      console.error('Error updating Company Name:', error);
      throw error;
    }
  }

  async remove(id: number) {
    return await this.companyNameRepository.softDelete({id});
  }
}
