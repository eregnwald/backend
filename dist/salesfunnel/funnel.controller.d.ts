import { SalesFunnelsService } from './funnel.service';
import { CreateFunnelDto } from './dto/create-funnel.dto';
import { SalesFunnelStagesService } from 'src/salesfunnelstages/funnel-stage.service';
export declare class FunnelController {
    private readonly funnelService;
    private readonly SalesFunnelStageService;
    constructor(funnelService: SalesFunnelsService, SalesFunnelStageService: SalesFunnelStagesService);
    getMyFunnels(req: any): Promise<import("./funnel.entity").SalesFunnel[]>;
    getShared(req: any): Promise<import("./funnel.entity").SalesFunnel[]>;
    getSharedStages(req: any): Promise<import("../salesfunnelstages/funnel-stage.entity").SalesFunnelStage[]>;
    create(dto: CreateFunnelDto): Promise<import("./funnel.entity").SalesFunnel>;
    getStages(id: string): Promise<import("../salesfunnelstages/funnel-stage.entity").SalesFunnelStage[]>;
    getFunnels(ownerId?: number, req?: any): Promise<import("./funnel.entity").SalesFunnel[]>;
    findOne(id: string): Promise<import("./funnel.entity").SalesFunnel>;
}
