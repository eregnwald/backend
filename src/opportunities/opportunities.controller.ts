import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Body,
  Put,
  ParseIntPipe 
} from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { FunnelStageDto } from './dto/funnel-stage.dto';
import { Opportunity } from './entities/opportunity.entity';
import { UpdateStageDto } from './dto/update-stage.dto';
import { UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

 @Post()
create(@Body() createOpportunityDto: CreateOpportunityDto) {
  return this.opportunitiesService.create(createOpportunityDto);
}


@Post(':opportunityId/tasks')
async createTask(
  @Param('opportunityId', ParseIntPipe) opportunityId: number,
  @Body() dto: CreateTaskDto,
) {
  return this.opportunitiesService.createTask(opportunityId, dto);
}
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req) {
    return this.opportunitiesService.findAll(req.user);
  } 


   @Get('funnel')
  async getFunnelData(): Promise<FunnelStageDto[]> {
    return this.opportunitiesService.getFunnelData();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opportunitiesService.findOne(+id);
  }

  @Patch(':id')
@UseGuards(AuthGuard('jwt'))
async updateOpportunity(
  @Param('id') id: string,
  @Body() dto: UpdateOpportunityDto
) {
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

  
  @Get('funnel/:id')
  async getOpportunitiesByFunnelId(@Param('id') funnelId: number) {
    return this.opportunitiesService.getOpportunitiesByFunnelId(funnelId);
  }


@Patch(':id/stage')
async updateStage(
  @Param('id') id: string,
  @Body() dto: UpdateStageDto
) {
  console.log('DTO:', dto); // Добавляем логирование
  const result = await this.opportunitiesService.updateStage(+id, dto.stage_id, dto.lost_reason);
  console.log('Updated Opportunity:', result); // Добавляем логирование результата
  return result;
}

@Patch(':id/owner')
@UseGuards(AuthGuard('jwt'))
async updateOwner(
  @Param('id') id: string,
  @Body() dto: { owner_id: number },
) {
  return this.opportunitiesService.update(+id, dto);
}


@Get(':id/tasks')
  async getTasks(@Param('id', ParseIntPipe) id: number) {
    return this.opportunitiesService.getTasksByOpportunity(id);
  }

  // Привязать задачу к сделке
  @Post(':opportunityId/tasks/:taskId')
  async addTask(
    @Param('opportunityId', ParseIntPipe) opportunityId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    await this.opportunitiesService.addTask(opportunityId, taskId);
    return { message: 'Задача успешно привязана к сделке' };
  }

  // Отвязать задачу от сделки
  @Delete(':opportunityId/tasks/:taskId')
  async removeTask(
    @Param('opportunityId', ParseIntPipe) opportunityId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    await this.opportunitiesService.removeTask(opportunityId, taskId);
    return { message: 'Задача успешно отвязана от сделки' };
  }

}