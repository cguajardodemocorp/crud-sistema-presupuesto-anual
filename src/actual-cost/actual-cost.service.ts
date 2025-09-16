import { Injectable } from '@nestjs/common';
import { CreateActualCostDto } from './dto/create-actual-cost.dto';
import { UpdateActualCostDto } from './dto/update-actual-cost.dto';

@Injectable()
export class ActualCostService {
  create(createActualCostDto: CreateActualCostDto) {
    return 'This action adds a new actualCost';
  }

  findAll() {
    return `This action returns all actualCost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actualCost`;
  }

  update(id: number, updateActualCostDto: UpdateActualCostDto) {
    return `This action updates a #${id} actualCost`;
  }

  remove(id: number) {
    return `This action removes a #${id} actualCost`;
  }
}
