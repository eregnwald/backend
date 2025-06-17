import { Repository } from 'typeorm';
import { SalesFunnelStage } from './funnel-stage.entity';
import { CreateStageDto } from './dto/create-stage.dto';
import { Opportunity } from '../opportunities/entities/opportunity.entity';
export declare class SalesFunnelStagesService {
    private readonly funnelStageRepository;
    private readonly opportunityRepository;
    constructor(funnelStageRepository: Repository<SalesFunnelStage>, opportunityRepository: Repository<Opportunity>);
    findAll(funnel_id: number): Promise<SalesFunnelStage[]>;
    findOne(stage_id: number): Promise<SalesFunnelStage>;
    create(funnel_id: number, dto: CreateStageDto): Promise<SalesFunnelStage>;
    update(stage_id: number, dto: Partial<CreateStageDto>): Promise<SalesFunnelStage>;
    remove(stage_id: number): Promise<{
        message: string;
    }>;
    private getNextPosition;
    bulkUpdate(funnelId: number, dtos: any[]): Promise<SalesFunnelStage[]>;
    getStagesForFunnel(funnelId: number): Promise<SalesFunnelStage[]>;
}
