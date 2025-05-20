import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InteractionTypesService } from './interaction-types.service';
import { CreateInteractionTypeDto } from './dto/create-interaction-type.dto';
import { UpdateInteractionTypeDto } from './dto/update-interaction-type.dto';

@Controller('interaction-types')
export class InteractionTypesController {
  constructor(private readonly interactionTypesService: InteractionTypesService) {}

  @Post()
  create(@Body() createInteractionTypeDto: CreateInteractionTypeDto) {
    return this.interactionTypesService.create(createInteractionTypeDto);
  }

  @Get()
  findAll() {
    return this.interactionTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interactionTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInteractionTypeDto: UpdateInteractionTypeDto) {
    return this.interactionTypesService.update(+id, updateInteractionTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interactionTypesService.remove(+id);
  }
}
