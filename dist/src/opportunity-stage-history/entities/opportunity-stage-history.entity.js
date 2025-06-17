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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpportunityStageHistory = void 0;
const typeorm_1 = require("typeorm");
const funnel_stage_entity_1 = require("../../salesfunnelstages/funnel-stage.entity");
let OpportunityStageHistory = class OpportunityStageHistory {
    id;
    changed_at;
    opportunity_id;
    old_stage_id;
    old_stage;
    new_stage_id;
    new_stage;
};
exports.OpportunityStageHistory = OpportunityStageHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OpportunityStageHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OpportunityStageHistory.prototype, "changed_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], OpportunityStageHistory.prototype, "opportunity_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], OpportunityStageHistory.prototype, "old_stage_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => funnel_stage_entity_1.SalesFunnelStage, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'old_stage_id' }),
    __metadata("design:type", Object)
], OpportunityStageHistory.prototype, "old_stage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], OpportunityStageHistory.prototype, "new_stage_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => funnel_stage_entity_1.SalesFunnelStage),
    (0, typeorm_1.JoinColumn)({ name: 'new_stage_id' }),
    __metadata("design:type", funnel_stage_entity_1.SalesFunnelStage)
], OpportunityStageHistory.prototype, "new_stage", void 0);
exports.OpportunityStageHistory = OpportunityStageHistory = __decorate([
    (0, typeorm_1.Entity)('opportunity_stage_history')
], OpportunityStageHistory);
//# sourceMappingURL=opportunity-stage-history.entity.js.map