import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto) {
      try {
        // Permitir crear solo si todos los países con ese mismo nombre están borrados en otros ID
        const paisesConNombre = await this.countryRepository.find({ where: { nombre: createCountryDto.nombre }, withDeleted: true });
        const algunoActivo = paisesConNombre.some(c => !c.deletedAt);
        if (algunoActivo) {
          throw new BadRequestException('El nombre de país ya existe y está activo');
      }
      const pais = this.countryRepository.create(createCountryDto);
      return await this.countryRepository.save(pais);
    } catch (error) {
      console.error('Error creando pais:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.countryRepository.find();
  }

  async findOne(id: number) {
    const country = await this.countryRepository.findOne({ where: { id }, withDeleted: true });
    if (!country) {
      throw new BadRequestException('Country not found');
    }
    if (country.deletedAt) {
      throw new BadRequestException('Country deleted');
    }
    return country;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    try {
      const country = await this.countryRepository.findOne({ where: { id }, withDeleted: true });
      if (!country) {
        throw new BadRequestException('Country not found');
      }
      if (country.deletedAt) {
        throw new BadRequestException('Country deleted');
      }
      // Validar que el nuevo código no exista en otro registro
      if (updateCountryDto.nombre) {
        const exists = await this.countryRepository.findOne({ where: { nombre: updateCountryDto.nombre } });
        if (exists && exists.id !== id) {
          throw new BadRequestException('El pais ya existe en otro registro');
        }
      }
      Object.assign(country, updateCountryDto);
      return await this.countryRepository.save(country);
    } catch (error) {
      console.error('Error updating Country:', error);
      throw error;
    }
  }
  

  async remove(id: number) {
    return await this.countryRepository.softDelete({id});
  }
}
