import { OpportunityStagesService } from './opportunity-stages.service';
import { CreateOpportunityStageDto } from './dto/create-opportunity-stage.dto';
import { UpdateOpportunityStageDto } from './dto/update-opportunity-stage.dto';
export declare class OpportunityStagesController {
    private readonly stagesService;
    constructor(stagesService: OpportunityStagesService);
    getAllStages(): Promise<import("./entities/opportunity-stage.entity").OpportunityStage[]>;
    getStage(id: string): Promise<import("./entities/opportunity-stage.entity").OpportunityStage>;
    createStage(dto: CreateOpportunityStageDto): Promise<import("./entities/opportunity-stage.entity").OpportunityStage>;
    updateStage(id: string, dto: UpdateOpportunityStageDto): Promise<import("./entities/opportunity-stage.entity").OpportunityStage>;
    deleteStage(id: string): Promise<void>;
}
