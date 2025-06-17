import { Opportunity } from '../../opportunities/entities/opportunity.entity';
export declare class OpportunityStage {
    stage_id: number;
    stage_name: string;
    probability: number;
    is_closed: boolean;
    opportunities: Opportunity[];
}
