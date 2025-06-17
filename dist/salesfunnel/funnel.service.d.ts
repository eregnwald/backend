import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SalesFunnel } from './funnel.entity';
import { SalesFunnelStage } from '../salesfunnelstages/funnel-stage.entity';
import { SalesFunnelStagesService } from '../salesfunnelstages/funnel-stage.service';
import { CreateFunnelDto } from './dto/create-funnel.dto';
export declare class SalesFunnelsService implements OnModuleInit {
    private readonly funnelRepository;
    private readonly funnelStageRepository;
    private readonly funnelStageService;
    constructor(funnelRepository: Repository<SalesFunnel>, funnelStageRepository: Repository<SalesFunnelStage>, funnelStageService: SalesFunnelStagesService);
    onModuleInit(): Promise<void>;
    getCurrentUserFunnel(owner_id: number): Promise<SalesFunnel>;
    create(dto: CreateFunnelDto): Promise<SalesFunnel>;
    createDefaultStages(funnel_id: number): Promise<void>;
    getDefaultSharedFunnel(): Promise<SalesFunnel>;
    getSharedFunnels(): Promise<SalesFunnel[]>;
    findOne(id: number): Promise<SalesFunnel | null>;
    findAll(): Promise<SalesFunnel[]>;
    getFunnelsByOwnerId(owner_id: number): Promise<SalesFunnel[]>;
    getFunnelsByUserId(userId: number): Promise<SalesFunnel[]>;
    createDefaultFunnel(owner_id: number): Promise<SalesFunnel>;
    getStagesForFunnel(funnel_id: number): Promise<SalesFunnelStage[]>;
}
