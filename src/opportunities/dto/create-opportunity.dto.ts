export class CreateOpportunityDto {
  opportunity_name: string;
  amount: number;

  account_id: number;
  contact_id: number;
  owner_id: number;
  is_closed: boolean; // ← можно сделать optional или required
  funnel_id: number; // ✅ Должен быть здесь
  task_id: number; // ✅
  is_won?: boolean;
}
