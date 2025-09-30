import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) { }

  async create(createAccountDto: CreateAccountDto) {
      // Validar que el nombre no sean solo espacios en blanco o un solo espacio en blanco, solo letras, números, espacios, puntos y guiones, sin espacios al inicio/fin
      if (createAccountDto.nombre) {
        createAccountDto.nombre = createAccountDto.nombre.trim();
        if (!/^(?! )[a-zA-Z0-9\s.\-]+(?<! )$/.test(createAccountDto.nombre)) {
          throw new BadRequestException('El nombre de la cuenta solo puede contener letras, números, espacios, puntos y guiones');
        }
      }
    try {
      // Permitir crear solo si todos las cuentas con ese mismo nombre están borrados en otros ID
      const cuentaConNombre = await this.accountRepository.find({ where: { nombre: createAccountDto.nombre }, withDeleted: true });
      const algunoActivo = cuentaConNombre.some(c => !c.deletedAt);
      if (algunoActivo) {
        throw new BadRequestException('El nombre de la cuenta ya existe y está activo');
      }
      const cuenta = this.accountRepository.create(createAccountDto);
      return await this.accountRepository.save(cuenta);
    } catch (error) {
      console.error('Error creando cuenta:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.accountRepository.find();
  }

  async findOne(id: number) {
    const accountName = await this.accountRepository.findOne({ where: { id }, withDeleted: true });
    if (!accountName) {
      throw new BadRequestException('Account name not found');
    }
    if (accountName.deletedAt) {
      throw new BadRequestException('Account name deleted');
    }
    return accountName;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
      // Validar que el nuevo nombre no sean solo espacios en blanco o un solo espacio en blanco, si no que solo contenga caracteres alfabéticos y espacios, eliminando los espacios al inicio y al final del nombre
      if (updateAccountDto.nombre) {
        updateAccountDto.nombre = updateAccountDto.nombre.trim();
        if (!/^(?! )[a-zA-Z0-9\s.\-]+(?<! )$/.test(updateAccountDto.nombre)) {
          throw new BadRequestException('El nombre de la cuenta solo puede contener letras, números, espacios, puntos y guiones');
        }
      }
    try {
      const accountName = await this.accountRepository.findOne({ where: { id }, withDeleted: true });
      if (!accountName) {
        throw new BadRequestException('Account name not found');
      }
      if (accountName.deletedAt) {
        throw new BadRequestException('Account name deleted');
      }
      // Validar que el nuevo nombre no exista en otro registro
      if (updateAccountDto.nombre) {
        const exists = await this.accountRepository.findOne({ where: { nombre: updateAccountDto.nombre } });
        if (exists && exists.id !== id) {
          throw new BadRequestException('Cuenta ya existe en otro registro');
        }
      }
      Object.assign(accountName, updateAccountDto);
      return await this.accountRepository.save(accountName);
    } catch (error) {
      console.error('Error updating Account Name:', error);
      throw error;
    }
  }

  async remove(id: number) {
    return await this.accountRepository.softDelete(id);
  }
}
