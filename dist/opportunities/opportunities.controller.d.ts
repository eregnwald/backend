import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
export declare class OpportunitiesController {
    private readonly opportunitiesService;
    constructor(opportunitiesService: OpportunitiesService);
    create(dto: CreateOpportunityDto): Promise<import("./entities/opportunity.entity").Opportunity>;
    findAll(): Promise<import("./entities/opportunity.entity").Opportunity[]>;
    findOne(id: string): Promise<import("./entities/opportunity.entity").Opportunity>;
    update(id: string, dto: UpdateOpportunityDto): Promise<import("./entities/opportunity.entity").Opportunity>;
    remove(id: string): Promise<void>;
    restore(id: string): Promise<import("./entities/opportunity.entity").Opportunity>;
}
