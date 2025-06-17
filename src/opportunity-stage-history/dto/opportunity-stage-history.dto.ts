// src/opportunity-stage-history/dto/opportunity-stage-history.dto.ts
export class OpportunityStageHistoryDto {
  id: number;
  opportunity_id: number;
  old_stage_id: number | null;
  new_stage_id: number;
  changed_at: Date;
}