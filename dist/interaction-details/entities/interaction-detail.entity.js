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
exports.InteractionDetail = void 0;
const typeorm_1 = require("typeorm");
const interaction_entity_1 = require("../../interactions/entities/interaction.entity");
let InteractionDetail = class InteractionDetail {
    detail_id;
    interaction;
    content;
    attachments;
};
exports.InteractionDetail = InteractionDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], InteractionDetail.prototype, "detail_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => interaction_entity_1.Interaction, interaction => interaction.interactionDetails, { onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'interaction_id' }),
    __metadata("design:type", interaction_entity_1.Interaction)
], InteractionDetail.prototype, "interaction", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], InteractionDetail.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], InteractionDetail.prototype, "attachments", void 0);
exports.InteractionDetail = InteractionDetail = __decorate([
    (0, typeorm_1.Entity)('interaction_details')
], InteractionDetail);
//# sourceMappingURL=interaction-detail.entity.js.map