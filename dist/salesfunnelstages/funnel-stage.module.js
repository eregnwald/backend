"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesFunnelStagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const funnel_stage_entity_1 = require("./funnel-stage.entity");
const funnel_stage_service_1 = require("./funnel-stage.service");
const funnel_stage_controller_1 = require("./funnel-stage.controller");
const opportunities_module_1 = require("../opportunities/opportunities.module");
let SalesFunnelStagesModule = class SalesFunnelStagesModule {
};
exports.SalesFunnelStagesModule = SalesFunnelStagesModule;
exports.SalesFunnelStagesModule = SalesFunnelStagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([funnel_stage_entity_1.SalesFunnelStage]),
            opportunities_module_1.OpportunitiesModule,
        ],
        providers: [funnel_stage_service_1.SalesFunnelStagesService],
        exports: [funnel_stage_service_1.SalesFunnelStagesService],
        controllers: [funnel_stage_controller_1.FunnelStageController],
    })
], SalesFunnelStagesModule);
//# sourceMappingURL=funnel-stage.module.js.map