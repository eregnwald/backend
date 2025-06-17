"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const opportunity_entity_1 = require("../opportunities/entities/opportunity.entity");
const funnel_stage_entity_1 = require("../salesfunnelstages/funnel-stage.entity");
const report_controller_1 = require("./report.controller");
const report_service_1 = require("./report.service");
const opportunity_stage_history_entity_1 = require("../opportunity-stage-history/entities/opportunity-stage-history.entity");
let ReportsModule = class ReportsModule {
};
exports.ReportsModule = ReportsModule;
exports.ReportsModule = ReportsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([opportunity_entity_1.Opportunity, funnel_stage_entity_1.SalesFunnelStage, opportunity_stage_history_entity_1.OpportunityStageHistory]),
        ],
        providers: [report_service_1.ReportService],
        controllers: [report_controller_1.ReportController],
        exports: [report_service_1.ReportService],
    })
], ReportsModule);
//# sourceMappingURL=report.module.js.map