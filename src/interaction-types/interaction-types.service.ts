import { Injectable } from '@nestjs/common';
import { CreateInteractionTypeDto } from './dto/create-interaction-type.dto';
import { UpdateInteractionTypeDto } from './dto/update-interaction-type.dto';

@Injectable()
export class InteractionTypesService {
  create(createInteractionTypeDto: CreateInteractionTypeDto) {
    return 'This action adds a new interactionType';
  }

  findAll() {
    return `This action returns all interactionTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interactionType`;
  }

  update(id: number, updateInteractionTypeDto: UpdateInteractionTypeDto) {
    return `This action updates a #${id} interactionType`;
  }

  remove(id: number) {
    return `This action removes a #${id} interactionType`;
  }
}
