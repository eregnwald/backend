import { PartialType } from '@nestjs/mapped-types';
import { CreateOpportunityDto } from './create-opportunity.dto';

export class UpdateOpportunityDto {
  opportunity_name?: string;
  amount?: number;

  account_id?: number;
  contact_id?: number;
  owner_id?: number;
  is_closed?: boolean; // ← ДОЛЖНО быть здесь
  funnel_id?: number;
  stage_id?: number;
  task_id?: number; // ✅
  is_won?: boolean;
  lost_reason?: string;
}