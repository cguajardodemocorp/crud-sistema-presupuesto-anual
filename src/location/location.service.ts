import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) { }

  async create(createLocationDto: CreateLocationDto) {
    try {
      // Permitir crear solo si todos las Localidades con ese mismo nombre están borrados en otros ID
      const localidadConNombre = await this.locationRepository.find({ where: { nombre: createLocationDto.nombre }, withDeleted: true });
      const algunoActivo = localidadConNombre.some(c => !c.deletedAt);
      if (algunoActivo) {
        throw new BadRequestException('El nombre de la localidad ya existe y está activo');
      }
      const location = this.locationRepository.create(createLocationDto);
      return await this.locationRepository.save(location);
    } catch (error) {
      console.error('Error creando localidad:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.locationRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOne({ where: { id }, withDeleted: true });
    if (!location) {
      throw new BadRequestException('Location not found');
    }
    if (location.deletedAt) {
      throw new BadRequestException('Location deleted');
    }
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    try {
      const locationName = await this.locationRepository.findOne({ where: { id }, withDeleted: true });
      if (!locationName) {
        throw new BadRequestException('Location name not found');
      }
      if (locationName.deletedAt) {
        throw new BadRequestException('Location name deleted');
      }
      // Validar que el nuevo nombre no exista en otro registro
      if (updateLocationDto.nombre) {
        const exists = await this.locationRepository.findOne({ where: { nombre: updateLocationDto.nombre } });
        if (exists && exists.id !== id) {
          throw new BadRequestException('Location ya existe en otro registro');
        }
      }
      Object.assign(locationName, updateLocationDto);
      return await this.locationRepository.save(locationName);
    } catch (error) {
      console.error('Error updating Location Name:', error);
      throw error;
    }
  }

  async remove(id: number) {
    return await this.locationRepository.softDelete(id);
  }
}
