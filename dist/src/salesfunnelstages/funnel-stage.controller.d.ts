import { SalesFunnelStagesService } from './funnel-stage.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
export declare class FunnelStageController {
    private readonly stageService;
    constructor(stageService: SalesFunnelStagesService);
    getAll(funnelId: string): Promise<import("./funnel-stage.entity").SalesFunnelStage[]>;
    getById(stageId: string): Promise<import("./funnel-stage.entity").SalesFunnelStage>;
    create(funnelId: string, dto: CreateStageDto): Promise<import("./funnel-stage.entity").SalesFunnelStage>;
    update(stageId: string, dto: UpdateStageDto): Promise<import("./funnel-stage.entity").SalesFunnelStage>;
    delete(stageId: string): Promise<{
        message: string;
    }>;
    bulkUpdate(funnelId: string, dtos: UpdateStageDto[]): Promise<import("./funnel-stage.entity").SalesFunnelStage[]>;
}
