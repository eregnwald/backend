"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpportunityStageHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const opportunity_stage_history_service_1 = require("./opportunity-stage-history.service");
const typeorm_1 = require("@nestjs/typeorm");
const opportunity_stage_history_entity_1 = require("./entities/opportunity-stage-history.entity");
let OpportunityStageHistoryModule = class OpportunityStageHistoryModule {
};
exports.OpportunityStageHistoryModule = OpportunityStageHistoryModule;
exports.OpportunityStageHistoryModule = OpportunityStageHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                opportunity_stage_history_entity_1.OpportunityStageHistory,
            ]),
        ],
        providers: [
            opportunity_stage_history_service_1.OpportunityStageHistoryService,
        ],
        exports: [
            opportunity_stage_history_service_1.OpportunityStageHistoryService,
        ],
    })
], OpportunityStageHistoryModule);
//# sourceMappingURL=opportunity-stage-history.module.js.map