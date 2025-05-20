import { Repository } from 'typeorm';
import { OpportunityStage } from './entities/opportunity-stage.entity';
export declare class OpportunityStagesService {
    private readonly stageRepository;
    constructor(stageRepository: Repository<OpportunityStage>);
    findAll(): Promise<OpportunityStage[]>;
    findOne(id: number): Promise<OpportunityStage>;
    create(data: {
        stage_name: string;
        is_closed?: boolean;
    }): Promise<OpportunityStage>;
    update(id: number, data: {
        stage_name?: string;
        is_closed?: boolean;
    }): Promise<OpportunityStage>;
    remove(id: number): Promise<void>;
}
