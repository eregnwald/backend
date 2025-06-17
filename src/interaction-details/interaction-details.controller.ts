import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InteractionDetailsService } from './interaction-details.service';
import { CreateInteractionDetailDto } from './dto/create-interaction-detail.dto';
import { UpdateInteractionDetailDto } from './dto/update-interaction-detail.dto';

@Controller('interaction-details')
export class InteractionDetailsController {
  constructor(private readonly interactionDetailsService: InteractionDetailsService) {}

  @Post()
  create(@Body() createInteractionDetailDto: CreateInteractionDetailDto) {
    return this.interactionDetailsService.create(createInteractionDetailDto);
  }

  @Get()
  findAll() {
    return this.interactionDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interactionDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInteractionDetailDto: UpdateInteractionDetailDto) {
    return this.interactionDetailsService.update(+id, updateInteractionDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interactionDetailsService.remove(+id);
  }
}
