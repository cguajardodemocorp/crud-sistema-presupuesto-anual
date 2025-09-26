import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
  ) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    try {
        // Permitir crear si todos los Monedas con ese código están borrados en otros ID
        const monedasConCodigo = await this.currencyRepository.find({ where: { codigo: createCurrencyDto.codigo }, withDeleted: true });
        const algunoActivo = monedasConCodigo.some(c => !c.deletedAt);
        if (algunoActivo) {
          throw new BadRequestException('El código de esta Moneda ya existe y está activo');
      }
      const moneda = this.currencyRepository.create(createCurrencyDto);
      return await this.currencyRepository.save(moneda);
    } catch (error) {
      console.error('Error creating Moneda:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.currencyRepository.find();
  }

  async findOne(id: number) {
    const moneda = await this.currencyRepository.findOne({ where: { id }, withDeleted: true });
    if (!moneda) {
      throw new BadRequestException('Moneda not found');
    }
    if (moneda.deletedAt) {
      throw new BadRequestException('Moneda deleted');
    }
    return moneda;
  }

  async update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    try {
      const moneda = await this.currencyRepository.findOne({ where: { id }, withDeleted: true });
      if (!moneda) {
        throw new BadRequestException('Moneda not found');
      }
      if (moneda.deletedAt) {
        throw new BadRequestException('Moneda deleted');
      }
      // Validar que el nuevo código no exista en otro registro
      if (updateCurrencyDto.codigo) {
        const exists = await this.currencyRepository.findOne({ where: { codigo: updateCurrencyDto.codigo } });
        if (exists && exists.id !== id) {
          throw new BadRequestException('El código de la moneda ya existe en otro registro');
        }
      }
      Object.assign(moneda, updateCurrencyDto);
      return await this.currencyRepository.save(moneda);
    } catch (error) {
      console.error('Error updating Moneda:', error);
      throw error;
    }
  }

  async remove(id: number) {
    return await this.currencyRepository.softDelete({ id });
  }
}
