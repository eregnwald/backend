import { SalesFunnelStage } from 'src/salesfunnelstages/funnel-stage.entity';
export declare class OpportunityStageHistory {
    id: number;
    changed_at: Date;
    opportunity_id: number;
    old_stage_id: number | null;
    old_stage: SalesFunnelStage | null;
    new_stage_id: number;
    new_stage: SalesFunnelStage;
}
