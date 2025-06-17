import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesFunnel } from './funnel.entity';
import { SalesFunnelStage } from '../salesfunnelstages/funnel-stage.entity';
import { SalesFunnelStagesService } from '../salesfunnelstages/funnel-stage.service';
import { CreateFunnelDto } from './dto/create-funnel.dto';

@Injectable()
export class SalesFunnelsService implements OnModuleInit {
  constructor(
    @InjectRepository(SalesFunnel)
    private readonly funnelRepository: Repository<SalesFunnel>,

    @InjectRepository(SalesFunnelStage)
    private readonly funnelStageRepository: Repository<SalesFunnelStage>,

    private readonly funnelStageService: SalesFunnelStagesService,
  ) {}

  async onModuleInit() {
    // 🚀 Автоматическое создание общей воронки при старте
    await this.getDefaultSharedFunnel().catch((err) => {
      console.error('Ошибка при создании общей воронки:', err);
    });
  }

  /**
   * Получить воронку текущего пользователя (или создать новую)
   */
  async getCurrentUserFunnel(owner_id: number): Promise<SalesFunnel> {
    const existing = await this.funnelRepository.findOneBy({ owner_id });

    if (existing) {
      return existing;
    }

    return this.createDefaultFunnel(owner_id);
  }

  /**
   * Создать новую воронку из DTO
   */
  async create(dto: CreateFunnelDto): Promise<SalesFunnel> {
    const funnel = this.funnelRepository.create(dto);
    const savedFunnel = await this.funnelRepository.save(funnel);

    await this.createDefaultStages(savedFunnel.funnel_id);

    return savedFunnel;
  }

  /**
   * Создать дефолтные этапы для воронки
   */
  async createDefaultStages(funnel_id: number) {
    const stages = [
      { stage_name: 'Первичный контакт', is_closed: false, is_won: false },
      { stage_name: 'Переговоры', is_closed: false, is_won: false },
      { stage_name: 'Принимают решение', is_closed: false, is_won: false },
      { stage_name: 'Успешно закрыта', is_closed: true, is_won: true },
      { stage_name: 'Закрыта и нереализована', is_closed: true, is_won: false },
    ];

    for (const [index, stage] of stages.entries()) {
      await this.funnelStageService.create(funnel_id, {
        stage_name: stage.stage_name,
        is_closed: stage.is_closed,
        is_won: stage.is_won,
        position: index + 1,
      });
    }
  }

  /**
   * Получить или создать общую воронку
   */
  async getDefaultSharedFunnel(): Promise<SalesFunnel> {
    let sharedFunnel = await this.funnelRepository.findOne({
      where: { is_shared: true },
    });

    if (!sharedFunnel) {
      sharedFunnel = this.funnelRepository.create({
        funnel_name: 'Общая воронка',
        is_shared: true,
        owner_id: null,
      });

      sharedFunnel = await this.funnelRepository.save(sharedFunnel);
      await this.createDefaultStages(sharedFunnel.funnel_id);
    }

    return sharedFunnel;
  }

  /**
   * Получить все общие воронки
   */
  async getSharedFunnels(): Promise<SalesFunnel[]> {
    return this.funnelRepository.find({
      where: { is_shared: true },
    });
  }

  /**
   * Получить воронку по ID
   */
  async findOne(id: number): Promise<SalesFunnel | null> {
    const funnel = await this.funnelRepository.findOneBy({ funnel_id: id });
    if (!funnel) {
      throw new Error(`Воронка с ID ${id} не найдена`);
    }
    return funnel;
  }

  /**
   * Получить все воронки
   */
  async findAll(): Promise<SalesFunnel[]> {
    return this.funnelRepository.find();
  }

  /**
   * Получить воронки по owner_id
   */
  async getFunnelsByOwnerId(owner_id: number): Promise<SalesFunnel[]> {
    return this.funnelRepository.find({
      where: { owner_id },
    });
  }

  /**
   * Получить воронки по user_id (для контроллера)
   */
  async getFunnelsByUserId(userId: number): Promise<SalesFunnel[]> {
    return this.funnelRepository.find({
      where: { owner_id: userId },
    });
  }

  /**
   * Создать дефолтную воронку для пользователя
   */
  async createDefaultFunnel(owner_id: number): Promise<SalesFunnel> {
    const funnel = this.funnelRepository.create({
      funnel_name: 'Моя воронка',
      owner_id,
      is_shared: false,
    });

    const savedFunnel = await this.funnelRepository.save(funnel);
    await this.createDefaultStages(savedFunnel.funnel_id);

    return savedFunnel;
  }

  /**
   * Получить этапы воронки
   */
  async getStagesForFunnel(funnel_id: number): Promise<SalesFunnelStage[]> {
    return this.funnelStageRepository.find({
      where: { funnel_id },
      order: { position: 'ASC' },
    });
  }
}