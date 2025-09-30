import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ceco } from './entities/ceco.entity';
import { CreateCecoDto } from './dto/create-ceco.dto';
import { UpdateCecoDto } from './dto/update-ceco.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CecoService {
  constructor(
    @InjectRepository(Ceco)
    private readonly cecoRepository: Repository<Ceco>,
  ) {}

  async create(createCecoDto: CreateCecoDto) {
      // Validar que el código no sean solo espacios en blanco o un solo espacio en blanco, solo letras, números, espacios, puntos y guiones, sin espacios al inicio/fin
      if (createCecoDto.codigo) {
        createCecoDto.codigo = createCecoDto.codigo.trim();
        if (!/^(?! )[a-zA-Z0-9\s.\-]+(?<! )$/.test(createCecoDto.codigo)) {
          throw new BadRequestException('El código del CECO solo puede contener letras, números, espacios, puntos y guiones');
        }
      }
    try {
        // Permitir crear si todos los CECO con ese código están borrados en otros ID
        const cecosConCodigo = await this.cecoRepository.find({ where: { codigo: createCecoDto.codigo }, withDeleted: true });
        const algunoActivo = cecosConCodigo.some(c => !c.deletedAt);
        if (algunoActivo) {
          throw new BadRequestException('El código de CECO ya existe y está activo');
      }
      const ceco = this.cecoRepository.create(createCecoDto);
      return await this.cecoRepository.save(ceco);
    } catch (error) {
      console.error('Error creating CECO:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.cecoRepository.find();
  }

  async findOne(id: number) {
    const ceco = await this.cecoRepository.findOne({ where: { id }, withDeleted: true });
    if (!ceco) {
      throw new BadRequestException('CECO not found');
    }
    if (ceco.deletedAt) {
      throw new BadRequestException('CECO deleted');
    }
    return ceco;
  }

  async update(id: number, updateCecoDto: UpdateCecoDto) {
      // Validar que el nuevo código no sean solo espacios en blanco o un solo espacio en blanco, si no que solo contenga caracteres alfabéticos y espacios, eliminando los espacios al inicio y al final del código
      if (updateCecoDto.codigo) {
        updateCecoDto.codigo = updateCecoDto.codigo.trim();
        if (!/^(?! )[a-zA-Z0-9\s.\-]+(?<! )$/.test(updateCecoDto.codigo)) {
          throw new BadRequestException('El código del CECO solo puede contener letras, números, espacios, puntos y guiones');
        }
      }
    try {
      const ceco = await this.cecoRepository.findOne({ where: { id }, withDeleted: true });
      if (!ceco) {
        throw new BadRequestException('CECO not found');
      }
      if (ceco.deletedAt) {
        throw new BadRequestException('CECO deleted');
      }
      // Validar que el nuevo código no exista en otro registro
      if (updateCecoDto.codigo) {
        const exists = await this.cecoRepository.findOne({ where: { codigo: updateCecoDto.codigo } });
        if (exists && exists.id !== id) {
          throw new BadRequestException('El código CECO ya existe en otro registro');
        }
      }
      Object.assign(ceco, updateCecoDto);
      return await this.cecoRepository.save(ceco);
    } catch (error) {
      console.error('Error updating CECO:', error);
      throw error;
    }
  }

  async remove(id: number) {
    return await this.cecoRepository.softDelete({ id });
  }
}
