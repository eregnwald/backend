import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { FunnelStageDto } from './dto/funnel-stage.dto';
import { Opportunity } from './entities/opportunity.entity';
import { UpdateStageDto } from './dto/update-stage.dto';
import { CreateTaskDto } from './dto/create-task.dto';
export declare class OpportunitiesController {
    private readonly opportunitiesService;
    constructor(opportunitiesService: OpportunitiesService);
    create(createOpportunityDto: CreateOpportunityDto): Promise<Opportunity>;
    createTask(opportunityId: number, dto: CreateTaskDto): Promise<import("../tasks/entities/task.entity").Task>;
    findAll(req: any): Promise<Opportunity[]>;
    getFunnelData(): Promise<FunnelStageDto[]>;
    findOne(id: string): Promise<Opportunity>;
    updateOpportunity(id: string, dto: UpdateOpportunityDto): Promise<Opportunity>;
    remove(id: string): Promise<void>;
    restore(id: string): Promise<Opportunity>;
    getOpportunitiesByFunnelId(funnelId: number): Promise<Opportunity[]>;
    updateStage(id: string, dto: UpdateStageDto): Promise<Opportunity>;
    updateOwner(id: string, dto: {
        owner_id: number;
    }): Promise<Opportunity>;
    getTasks(id: number): Promise<import("../tasks/entities/task.entity").Task[]>;
    addTask(opportunityId: number, taskId: number): Promise<{
        message: string;
    }>;
    removeTask(opportunityId: number, taskId: number): Promise<{
        message: string;
    }>;
}
