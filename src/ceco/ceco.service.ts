import { Injectable } from '@nestjs/common';
import { CreateCecoDto } from './dto/create-ceco.dto';
import { UpdateCecoDto } from './dto/update-ceco.dto';

@Injectable()
export class CecoService {
  create(createCecoDto: CreateCecoDto) {
    return 'This action adds a new ceco';
  }

  findAll() {
    return `This action returns all ceco`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ceco`;
  }

  update(id: number, updateCecoDto: UpdateCecoDto) {
    return `This action updates a #${id} ceco`;
  }

  remove(id: number) {
    return `This action removes a #${id} ceco`;
  }
}
