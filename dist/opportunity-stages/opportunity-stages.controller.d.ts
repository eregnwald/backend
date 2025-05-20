import { OpportunityStagesService } from './opportunity-stages.service';
import { CreateOpportunityStageDto } from './dto/create-opportunity-stage.dto';
import { UpdateOpportunityStageDto } from './dto/update-opportunity-stage.dto';
export declare class OpportunityStagesController {
    private readonly opportunityStagesService;
    constructor(opportunityStagesService: OpportunityStagesService);
    create(dto: CreateOpportunityStageDto): Promise<import("./entities/opportunity-stage.entity").OpportunityStage>;
    findAll(): Promise<import("./entities/opportunity-stage.entity").OpportunityStage[]>;
    findOne(id: string): Promise<import("./entities/opportunity-stage.entity").OpportunityStage>;
    update(id: string, dto: UpdateOpportunityStageDto): Promise<import("./entities/opportunity-stage.entity").OpportunityStage>;
    remove(id: string): Promise<void>;
}
