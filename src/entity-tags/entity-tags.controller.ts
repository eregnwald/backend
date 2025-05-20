import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntityTagsService } from './entity-tags.service';
import { CreateEntityTagDto } from './dto/create-entity-tag.dto';
import { UpdateEntityTagDto } from './dto/update-entity-tag.dto';

@Controller('entity-tags')
export class EntityTagsController {
  constructor(private readonly entityTagsService: EntityTagsService) {}

  @Post()
  create(@Body() createEntityTagDto: CreateEntityTagDto) {
    return this.entityTagsService.create(createEntityTagDto);
  }

  @Get()
  findAll() {
    return this.entityTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entityTagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntityTagDto: UpdateEntityTagDto) {
    return this.entityTagsService.update(+id, updateEntityTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entityTagsService.remove(+id);
  }
}
