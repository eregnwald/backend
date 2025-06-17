import { Repository } from 'typeorm';
import { OpportunityStageHistory } from './entities/opportunity-stage-history.entity';
export declare class OpportunityStageHistoryService {
    private readonly historyRepository;
    constructor(historyRepository: Repository<OpportunityStageHistory>);
    logStageChange(opportunityId: number, oldStageId: number | null, newStageId: number): Promise<void>;
    getHistoryByOpportunity(opportunityId: number): Promise<OpportunityStageHistory[]>;
}
