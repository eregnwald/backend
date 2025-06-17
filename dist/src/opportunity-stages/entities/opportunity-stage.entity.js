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
exports.OpportunityStage = void 0;
const typeorm_1 = require("typeorm");
const opportunity_entity_1 = require("../../opportunities/entities/opportunity.entity");
let OpportunityStage = class OpportunityStage {
    stage_id;
    stage_name;
    probability;
    is_closed;
    opportunities;
};
exports.OpportunityStage = OpportunityStage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], OpportunityStage.prototype, "stage_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], OpportunityStage.prototype, "stage_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 5, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], OpportunityStage.prototype, "probability", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], OpportunityStage.prototype, "is_closed", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => opportunity_entity_1.Opportunity, opportunity => opportunity.stage),
    __metadata("design:type", Array)
], OpportunityStage.prototype, "opportunities", void 0);
exports.OpportunityStage = OpportunityStage = __decorate([
    (0, typeorm_1.Entity)('opportunity_stages')
], OpportunityStage);
//# sourceMappingURL=opportunity-stage.entity.js.map