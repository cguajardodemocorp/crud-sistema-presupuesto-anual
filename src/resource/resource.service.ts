import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  async create(createResourceDto: CreateResourceDto) {
      // Validar que el nombre no sean solo espacios en blanco o un solo espacio en blanco, solo letras, números, espacios, puntos y guiones, sin espacios al inicio/fin
      if (createResourceDto.nombre) {
        createResourceDto.nombre = createResourceDto.nombre.trim();
        if (!/^(?! )[a-zA-Z0-9\s.\-]+(?<! )$/.test(createResourceDto.nombre)) {
          throw new BadRequestException('El nombre del recurso solo puede contener letras, números, espacios, puntos y guiones');
        }
      }
    try {
      // Permitir crear solo si todos los Recursos con ese mismo nombre están borrados en otros ID
      const resourceConNombre = await this.resourceRepository.find({ where: { nombre: createResourceDto.nombre }, withDeleted: true });
      const algunoActivo = resourceConNombre.some(c => !c.deletedAt);
      if (algunoActivo) {
        throw new BadRequestException('El nombre del recurso ya existe y está activo');
      }
      const resource = this.resourceRepository.create(createResourceDto);
      return await this.resourceRepository.save(resource);
    } catch (error) {
      console.error('Error creando recurso:', error);
      throw error;
    }
  }

  async findAll() {
      return await this.resourceRepository.find();
  }

  async findOne(id: number) {
    const resource = await this.resourceRepository.findOne({ where: { id }, withDeleted: true });
    if (!resource) {
      throw new BadRequestException('Resource not found');
    }
    if (resource.deletedAt) {
      throw new BadRequestException('Resource deleted');
    }
    return resource;
  }

  async update(id: number, updateResourceDto: UpdateResourceDto) {
      // Validar que el nuevo nombre no sean solo espacios en blanco o un solo espacio en blanco, si no que solo contenga caracteres alfabéticos y espacios, eliminando los espacios al inicio y al final del nombre
      if (updateResourceDto.nombre) {
        updateResourceDto.nombre = updateResourceDto.nombre.trim();
        if (!/^(?! )[a-zA-Z0-9\s.\-]+(?<! )$/.test(updateResourceDto.nombre)) {
          throw new BadRequestException('El nombre del recurso solo puede contener letras, números, espacios, puntos y guiones');
        }
      }
    try {
      const resourceName = await this.resourceRepository.findOne({ where: { id }, withDeleted: true });
      if (!resourceName) {
        throw new BadRequestException('Resource not found');
      }
      if (resourceName.deletedAt) {
        throw new BadRequestException('Resource deleted');
      }
      // Validar que el nuevo nombre no exista en otro registro
      if (updateResourceDto.nombre) {
        const exists = await this.resourceRepository.findOne({ where: { nombre: updateResourceDto.nombre } });
        if (exists && exists.id !== id) {
          throw new BadRequestException('Resource ya existe en otro registro');
        }
      }
      Object.assign(resourceName, updateResourceDto);
      return await this.resourceRepository.save(resourceName);
    } catch (error) {
      console.error('Error updating Resource Name:', error);
      throw error;
    }
  }

  async remove(id: number) {
    return await this.resourceRepository.softDelete(id);
  }
}
