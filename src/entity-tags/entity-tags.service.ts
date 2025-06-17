import { Injectable } from '@nestjs/common';
import { CreateEntityTagDto } from './dto/create-entity-tag.dto';
import { UpdateEntityTagDto } from './dto/update-entity-tag.dto';

@Injectable()
export class EntityTagsService {
  create(createEntityTagDto: CreateEntityTagDto) {
    return 'This action adds a new entityTag';
  }

  findAll() {
    return `This action returns all entityTags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entityTag`;
  }

  update(id: number, updateEntityTagDto: UpdateEntityTagDto) {
    return `This action updates a #${id} entityTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} entityTag`;
  }
}
