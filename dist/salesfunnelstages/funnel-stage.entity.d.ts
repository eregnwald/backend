import { SalesFunnel } from '../salesfunnel/funnel.entity';
import { Opportunity } from '../opportunities/entities/opportunity.entity';
export declare class SalesFunnelStage {
    stage_id: number;
    stage_name: string;
    probability: number;
    is_closed: boolean;
    is_won: boolean;
    funnel_id: number;
    position: number;
    funnel: SalesFunnel;
    opportunities: Opportunity[];
}
