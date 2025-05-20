import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OpportunityStagesService } from './opportunity-stages.service';
import { CreateOpportunityStageDto } from './dto/create-opportunity-stage.dto';
import { UpdateOpportunityStageDto } from './dto/update-opportunity-stage.dto';

@Controller('stages')
export class OpportunityStagesController {
  constructor(
    private readonly opportunityStagesService: OpportunityStagesService,
  ) {}

  @Post()
  create(@Body() dto: CreateOpportunityStageDto) {
    return this.opportunityStagesService.create(dto);
  }

  @Get()
  findAll() {
    return this.opportunityStagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opportunityStagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateOpportunityStageDto,
  ) {
    return this.opportunityStagesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opportunityStagesService.remove(+id);
  }
}