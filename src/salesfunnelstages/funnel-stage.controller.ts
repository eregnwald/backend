import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SalesFunnelStagesService } from './funnel-stage.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';

@Controller('funnels/:funnelId/stages')
export class FunnelStageController {
  constructor(private readonly stageService: SalesFunnelStagesService) {}

  @Get()
  async getAll(@Param('funnelId') funnelId: string) {
    return this.stageService.findAll(+funnelId);
  }
  
  @Get(':stageId')
async getById(@Param('stageId') stageId: string) {
  return this.stageService.findOne(+stageId);
}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Param('funnelId') funnelId: string,
    @Body() dto: CreateStageDto,
  ) {
    return this.stageService.create(+funnelId, dto);
  }

  @Patch(':stageId')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('stageId') stageId: string,
    @Body() dto: UpdateStageDto,
  ) {
    return this.stageService.update(+stageId, dto);
  }

  @Delete(':stageId')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('stageId') stageId: string) {
    return this.stageService.remove(+stageId);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async bulkUpdate(
  @Param('funnelId') funnelId: string,
  @Body() dtos: UpdateStageDto[],
) {
  return this.stageService.bulkUpdate(+funnelId, dtos);
}

}