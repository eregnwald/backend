// src/opportunity-stage-history/opportunity-stage-history.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { OpportunityStageHistoryService } from './opportunity-stage-history.service';

@Controller('opportunity-stage-history')
export class OpportunityStageHistoryController {
  constructor(private readonly historyService: OpportunityStageHistoryService) {}

  @Get(':id')
  async getHistory(@Param('id') id: number) {
    return await this.historyService.getHistoryByOpportunity(+id);
  }
}