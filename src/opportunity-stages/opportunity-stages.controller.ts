import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { OpportunityStagesService } from './opportunity-stages.service';
import { CreateOpportunityStageDto } from './dto/create-opportunity-stage.dto';
import { UpdateOpportunityStageDto } from './dto/update-opportunity-stage.dto';

@Controller('stages')
export class OpportunityStagesController {
  constructor(private readonly stagesService: OpportunityStagesService) {}


  @Get()
  async getAllStages() {
    return this.stagesService.findAll();
  }


  @Get(':id')
  async getStage(@Param('id') id: string) {
    const stageId = parseInt(id, 10);
    return this.stagesService.findOne(stageId);
  }


  @Post()
  async createStage(@Body() dto: CreateOpportunityStageDto) {
    return this.stagesService.create(dto);
  }

  @Patch(':id')
  async updateStage(@Param('id') id: string, @Body() dto: UpdateOpportunityStageDto) {
    const stageId = parseInt(id, 10);
    return this.stagesService.update(stageId, dto);
  }

  @Delete(':id')
  async deleteStage(@Param('id') id: string) {
    const stageId = parseInt(id, 10);
    return this.stagesService.remove(stageId);
  }
}