import { Injectable } from '@nestjs/common';
import { CreateInteractionDetailDto } from './dto/create-interaction-detail.dto';
import { UpdateInteractionDetailDto } from './dto/update-interaction-detail.dto';

@Injectable()
export class InteractionDetailsService {
  create(createInteractionDetailDto: CreateInteractionDetailDto) {
    return 'This action adds a new interactionDetail';
  }

  findAll() {
    return `This action returns all interactionDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interactionDetail`;
  }

  update(id: number, updateInteractionDetailDto: UpdateInteractionDetailDto) {
    return `This action updates a #${id} interactionDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} interactionDetail`;
  }
}
