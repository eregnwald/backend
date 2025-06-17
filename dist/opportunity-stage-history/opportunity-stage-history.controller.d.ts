import { OpportunityStageHistoryService } from './opportunity-stage-history.service';
export declare class OpportunityStageHistoryController {
    private readonly historyService;
    constructor(historyService: OpportunityStageHistoryService);
    getHistory(id: number): Promise<import("./entities/opportunity-stage-history.entity").OpportunityStageHistory[]>;
}
