import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request,
  Query,
  
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator'; // ✅ Импортируем декоратор
import { User } from '../users/entities/user.entity'; // ✅ Импортируем сущность
import { SalesFunnelsService } from './funnel.service';
import { CreateFunnelDto } from './dto/create-funnel.dto';
import { NotFoundException } from '@nestjs/common'; // ✅ Импортируем
import { SalesFunnelStagesService } from 'src/salesfunnelstages/funnel-stage.service';
@Controller('funnels')
export class FunnelController {
  constructor(
    private readonly funnelService: SalesFunnelsService,
    private readonly SalesFunnelStageService: SalesFunnelStagesService, 
  )
  
  {}
  

    @Get('me')
  @UseGuards(AuthGuard ('jwt'))
  async getMyFunnels(@Request() req) {
    const userId = req.user.sub; // ID пользователя из JWT
    return this.funnelService.getFunnelsByUserId(userId);
  }

  @Get('shared')
@UseGuards(AuthGuard('jwt'))
async getShared(@Request() req) {
  return this.funnelService.getSharedFunnels();
}

@Get('shared/stages')
async getSharedStages(@Request() req) {
  const sharedFunnel = await this.funnelService.getDefaultSharedFunnel();
  return this.SalesFunnelStageService.getStagesForFunnel(sharedFunnel.funnel_id);
}

  @Post()
  async create(@Body() dto: CreateFunnelDto) {
    return this.funnelService.create(dto);
  }

  @Get(':id/stages')
  async getStages(@Param('id') id: string) {
    return this.funnelService.getStagesForFunnel(+id);
  }

  // Получить воронку текущего пользователя
 @Get()
async getFunnels(
  @Query('owner_id') ownerId?: number,
  @Request() req?,
) {
  if (ownerId) {
    return this.funnelService.getFunnelsByOwnerId(ownerId);
  }

  // Либо верни все воронки
  return this.funnelService.findAll();
}

  // Получить воронку по ID (защищённый маршрут)
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    const funnel = await this.funnelService.findOne(+id);

    if (!funnel) {
      throw new NotFoundException('Воронка не найдена');
    }

    return funnel;
  }

  

}