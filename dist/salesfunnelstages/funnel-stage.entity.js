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
exports.SalesFunnelStage = void 0;
const typeorm_1 = require("typeorm");
const funnel_entity_1 = require("../salesfunnel/funnel.entity");
const opportunity_entity_1 = require("../opportunities/entities/opportunity.entity");
let SalesFunnelStage = class SalesFunnelStage {
    stage_id;
    stage_name;
    probability;
    is_closed;
    is_won;
    funnel_id;
    position;
    funnel;
    opportunities;
};
exports.SalesFunnelStage = SalesFunnelStage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SalesFunnelStage.prototype, "stage_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], SalesFunnelStage.prototype, "stage_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], SalesFunnelStage.prototype, "probability", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], SalesFunnelStage.prototype, "is_closed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], SalesFunnelStage.prototype, "is_won", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], SalesFunnelStage.prototype, "funnel_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], SalesFunnelStage.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => funnel_entity_1.SalesFunnel),
    (0, typeorm_1.JoinColumn)({ name: 'funnel_id' }),
    __metadata("design:type", funnel_entity_1.SalesFunnel)
], SalesFunnelStage.prototype, "funnel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => opportunity_entity_1.Opportunity, opportunity => opportunity.stage),
    __metadata("design:type", Array)
], SalesFunnelStage.prototype, "opportunities", void 0);
exports.SalesFunnelStage = SalesFunnelStage = __decorate([
    (0, typeorm_1.Entity)('sales_funnel_stages')
], SalesFunnelStage);
//# sourceMappingURL=funnel-stage.entity.js.map