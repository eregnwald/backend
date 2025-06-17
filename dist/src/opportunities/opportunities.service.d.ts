import { Repository } from 'typeorm';
import { Opportunity } from './entities/opportunity.entity';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { FunnelStageDto } from './dto/funnel-stage.dto';
import { OpportunityTask } from 'src/opportunitytask/entitites/opportunitytask.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { SalesFunnelStage } from 'src/salesfunnelstages/funnel-stage.entity';
import { OpportunityStageHistoryService } from 'src/opportunity-stage-history/opportunity-stage-history.service';
export declare class OpportunitiesService {
    private readonly opportunityRepository;
    private readonly opportunityTaskRepository;
    private readonly taskRepository;
    private readonly funnelStageRepository;
    private readonly historyService;
    constructor(opportunityRepository: Repository<Opportunity>, opportunityTaskRepository: Repository<OpportunityTask>, taskRepository: Repository<Task>, funnelStageRepository: Repository<SalesFunnelStage>, historyService: OpportunityStageHistoryService);
    create(dto: CreateOpportunityDto): Promise<Opportunity>;
    findAll(currentUser: any): Promise<Opportunity[]>;
    findOne(id: number): Promise<Opportunity>;
    update(id: number, dto: UpdateOpportunityDto): Promise<Opportunity>;
    remove(id: number): Promise<void>;
    restore(id: number): Promise<Opportunity>;
    getFunnelData(): Promise<FunnelStageDto[]>;
    getOpportunitiesByFunnelId(funnelId: number): Promise<Opportunity[]>;
    updateStage(opportunityId: number, stageId: number, lost_reason?: string | null): Promise<Opportunity>;
    getTasksByOpportunity(opportunityId: number): Promise<Task[]>;
    addTask(opportunityId: number, taskId: number): Promise<void>;
    removeTask(opportunityId: number, taskId: number): Promise<void>;
    createTask(opportunityId: number, dto: CreateTaskDto): Promise<Task>;
    getConversionRates(): Promise<{}>;
    getAverageTimeOnStages(): Promise<{
        stage_id: number;
        avg_time_ms: number;
    }[]>;
    getReportByOwner(): Promise<unknown[]>;
}
