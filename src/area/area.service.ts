import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Area } from './entities/area.entity';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) { }

  async create(createAreaDto: CreateAreaDto) {
      // Validar que el nombre no sean solo espacios en blanco o un solo espacio en blanco, solo letras, números, espacios, puntos y guiones, sin espacios al inicio/fin
      if (createAreaDto.nombre) {
        createAreaDto.nombre = createAreaDto.nombre.trim();
        if (!/^(?! )[a-zA-Z0-9\s.\-]+(?<! )$/.test(createAreaDto.nombre)) {
          throw new BadRequestException('El nombre del área solo puede contener letras, números, espacios, puntos y guiones');
        }
      }
      // Validar que el nombre no sean solo espacios en blanco o un solo espacio en blanco, solo letras o numeros y espacios, sin espacios al inicio/fin
      if (createAreaDto.nombre) {
        createAreaDto.nombre = createAreaDto.nombre.trim();
        if (!/^(?! )[a-zA-Z0-9\s.\-]+(?<! )$/.test(createAreaDto.nombre)) {
          throw new BadRequestException('El nombre del área solo puede contener letras, números, espacios, puntos y guiones');
        }
      }
    try {
      // Permitir crear solo si todos las Areas con ese mismo nombre están borrados en otros ID
      const areaConNombre = await this.areaRepository.find({ where: { nombre: createAreaDto.nombre }, withDeleted: true });
      const algunoActivo = areaConNombre.some(c => !c.deletedAt);
      if (algunoActivo) {
        throw new BadRequestException('El nombre de la area ya existe y está activo');
      }
      const area = this.areaRepository.create(createAreaDto);
      return await this.areaRepository.save(area);
    } catch (error) {
      console.error('Error creando area:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.areaRepository.find();
  }

  async findOne(id: number) {
    const area = await this.areaRepository.findOne({ where: { id }, withDeleted: true });
    if (!area) {
      throw new BadRequestException('Area not found');
    }
    if (area.deletedAt) {
      throw new BadRequestException('Area deleted');
    }
    return area;
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) {
      // Validar que el nuevo nombre no sean solo espacios en blanco o un solo espacio en blanco, si no que solo contenga caracteres alfabéticos y espacios, eliminando los espacios al inicio y al final del nombre
      if (updateAreaDto.nombre) {
        updateAreaDto.nombre = updateAreaDto.nombre.trim();
        if (!/^(?! )[a-zA-Z0-9\s.\-]+(?<! )$/.test(updateAreaDto.nombre)) {
          throw new BadRequestException('El nombre del área solo puede contener letras, números, espacios, puntos y guiones');
        }
      }
    try {
      const areaName = await this.areaRepository.findOne({ where: { id }, withDeleted: true });
      if (!areaName) {
        throw new BadRequestException('Area name not found');
      }
      if (areaName.deletedAt) {
        throw new BadRequestException('Area name deleted');
      }
      // Validar que el nuevo nombre no exista en otro registro
      if (updateAreaDto.nombre) {
        const exists = await this.areaRepository.findOne({ where: { nombre: updateAreaDto.nombre } });
        if (exists && exists.id !== id) {
          throw new BadRequestException('Area ya existe en otro registro');
        }
      }
      Object.assign(areaName, updateAreaDto);
      return await this.areaRepository.save(areaName);
    } catch (error) {
      console.error('Error updating Area Name:', error);
      throw error;
    }
  }

  async remove(id: number) {
    return await this.areaRepository.softDelete(id);
  }
}
