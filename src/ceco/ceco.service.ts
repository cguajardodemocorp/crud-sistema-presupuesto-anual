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
    try {
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
    const ceco = await this.cecoRepository.findOne({ where: { id }, withDeleted: true });
    if (!ceco) {
      throw new BadRequestException('CECO not found');
    }
    if (ceco.deletedAt) {
      throw new BadRequestException('CECO deleted');
    }
    Object.assign(ceco, updateCecoDto);
    return await this.cecoRepository.save(ceco);
  }

  async remove(id: number) {
    return await this.cecoRepository.softDelete({ id });
  }
}
