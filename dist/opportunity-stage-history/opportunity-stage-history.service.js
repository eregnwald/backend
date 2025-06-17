"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpportunityStageHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const opportunity_stage_history_entity_1 = require("./entities/opportunity-stage-history.entity");
let OpportunityStageHistoryService = class OpportunityStageHistoryService {
    historyRepository;
    constructor(historyRepository) {
        this.historyRepository = historyRepository;
    }
    async logStageChange(opportunityId, oldStageId, newStageId) {
        const history = this.historyRepository.create({
            opportunity_id: opportunityId,
            old_stage_id: oldStageId,
            new_stage_id: newStageId,
        });
        await this.historyRepository.save(history);
    }
    async getHistoryByOpportunity(opportunityId) {
        return await this.historyRepository.find({
            where: { opportunity_id: opportunityId },
            order: { changed_at: 'ASC' },
        });
    }
};
exports.OpportunityStageHistoryService = OpportunityStageHistoryService;
exports.OpportunityStageHistoryService = OpportunityStageHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(opportunity_stage_history_entity_1.OpportunityStageHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OpportunityStageHistoryService);
//# sourceMappingURL=opportunity-stage-history.service.js.map