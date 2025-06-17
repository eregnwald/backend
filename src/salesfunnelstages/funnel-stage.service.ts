import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesFunnelStage } from './funnel-stage.entity';
import { CreateStageDto } from './dto/create-stage.dto';
import { Opportunity } from '../opportunities/entities/opportunity.entity';

@Injectable()
export class SalesFunnelStagesService {
  constructor(
    @InjectRepository(SalesFunnelStage)
    private readonly funnelStageRepository: Repository<SalesFunnelStage>,
    @InjectRepository(Opportunity)
    private readonly opportunityRepository: Repository<Opportunity>,
  ) {}

  async findAll(funnel_id: number) {
    return this.funnelStageRepository.find({
      where: { funnel_id },
      order: { position: 'ASC' },
    });
  }

  async findOne(stage_id: number) {
    const stage = await this.funnelStageRepository.findOneBy({ stage_id });
    if (!stage) throw new Error(`Stage with ID ${stage_id} not found`);
    return stage;
  }

  async create(funnel_id: number, dto: CreateStageDto) {
    const nextPosition = await this.getNextPosition(funnel_id);

    const stage = this.funnelStageRepository.create({
      ...dto,
      funnel_id,
      position: nextPosition,
      probability: dto.is_closed ? 100 : dto.probability ?? nextPosition * 25,
    });

    return this.funnelStageRepository.save(stage);
  }

  async update(stage_id: number, dto: Partial<CreateStageDto>) {
    const stage = await this.findOne(stage_id);

    if (dto.stage_name !== undefined) {
      stage.stage_name = dto.stage_name;
    }

    if (dto.is_closed !== undefined) {
      stage.is_closed = dto.is_closed;
      if (dto.is_closed) {
        stage.probability = 100;
      }
    }

    if (dto.probability !== undefined && !stage.is_closed) {
      stage.probability = dto.probability;
    }

    return this.funnelStageRepository.save(stage);
  }

  async remove(stage_id: number) {
    const stage = await this.findOne(stage_id);

    // Проверяем, есть ли сделки на этом этапе
    const deals = await this.opportunityRepository.find({ where: { stage_id } });

    if (deals.length > 0) {
      // Ищем этап "Неразобранное"
      let unresolvedStage = await this.funnelStageRepository.findOne({
        where: { funnel_id: stage.funnel_id, stage_name: 'Неразобранное' },
      });

      if (!unresolvedStage) {
        // Создаём "Неразобранное", если его нет
        unresolvedStage = this.funnelStageRepository.create({
          funnel_id: stage.funnel_id,
          stage_name: 'Неразобранное',
          position: (await this.funnelStageRepository.count()) + 1,
          is_closed: false,
          probability: 0,
        });
        await this.funnelStageRepository.save(unresolvedStage);
      }

      // Переносим сделки в "Неразобранное"
      await this.opportunityRepository.update(
        { stage_id },
        { stage_id: unresolvedStage.stage_id },
      );
    }

    // Удаляем этап
    await this.funnelStageRepository.remove(stage);

    return { message: 'Stage removed successfully' };
  }

  private async getNextPosition(funnel_id: number): Promise<number> {
    const count = await this.funnelStageRepository.count({ where: { funnel_id } });
    return count + 1;
  }

  async bulkUpdate(funnelId: number, dtos: any[]) {
    for (const dto of dtos) {
      const stage = await this.findOne(dto.stage_id);
      Object.assign(stage, dto); // обновляем поля
      await this.funnelStageRepository.save(stage);
    }
    return this.findAll(funnelId);
  }

  async getStagesForFunnel(funnelId: number): Promise<SalesFunnelStage[]> {
  return this.funnelStageRepository.find({ where: { funnel_id: funnelId } });
}
}