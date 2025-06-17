// src/opportunity-stage-history/opportunity-stage-history.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpportunityStageHistory } from './entities/opportunity-stage-history.entity';

@Injectable()
export class OpportunityStageHistoryService {
  constructor(
    @InjectRepository(OpportunityStageHistory)
    private readonly historyRepository: Repository<OpportunityStageHistory>,
  ) {}

  // Сохраняем переход между этапами
  async logStageChange(opportunityId: number, oldStageId: number | null, newStageId: number) {
    const history = this.historyRepository.create({
      opportunity_id: opportunityId,
      old_stage_id: oldStageId,
      new_stage_id: newStageId,
    });
    await this.historyRepository.save(history);
  }

  // Получаем историю по конкретной сделке
 async getHistoryByOpportunity(opportunityId: number) {
  return await this.historyRepository.find({
    where: { opportunity_id: opportunityId },
    order: { changed_at: 'ASC' },
  });
}
}