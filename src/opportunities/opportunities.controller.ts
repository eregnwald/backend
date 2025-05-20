import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Post()
  create(@Body() dto: CreateOpportunityDto) {
    return this.opportunitiesService.create(dto);
  }

  @Get()
  findAll() {
    return this.opportunitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opportunitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOpportunityDto) {
    return this.opportunitiesService.update(+id, dto);
  }

    // Soft delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opportunitiesService.remove(+id);
  }

  // Restore
  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.opportunitiesService.restore(+id);
  }
}