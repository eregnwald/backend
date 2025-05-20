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
exports.Interaction = void 0;
const typeorm_1 = require("typeorm");
const account_entity_1 = require("../../accounts/entities/account.entity");
const contact_entity_1 = require("../../contacts/entities/contact.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const interaction_type_entity_1 = require("../../interaction-types/entities/interaction-type.entity");
const interaction_detail_entity_1 = require("../../interaction-details/entities/interaction-detail.entity");
let Interaction = class Interaction {
    interaction_id;
    subject;
    type;
    account;
    contact;
    user;
    start_time;
    end_time;
    description;
    outcome;
    created_at;
    interactionDetails;
};
exports.Interaction = Interaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Interaction.prototype, "interaction_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Interaction.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => interaction_type_entity_1.InteractionType, interactionType => interactionType.interactions, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'type_id' }),
    __metadata("design:type", interaction_type_entity_1.InteractionType)
], Interaction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, account => account.interactions, { onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'account_id' }),
    __metadata("design:type", account_entity_1.Account)
], Interaction.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contact_entity_1.Contact, contact => contact.interactions, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'contact_id' }),
    __metadata("design:type", Object)
], Interaction.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.interactions, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Object)
], Interaction.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: false }),
    __metadata("design:type", Date)
], Interaction.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Interaction.prototype, "end_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Interaction.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Interaction.prototype, "outcome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Interaction.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => interaction_detail_entity_1.InteractionDetail, interactionDetail => interactionDetail.interaction),
    __metadata("design:type", Array)
], Interaction.prototype, "interactionDetails", void 0);
exports.Interaction = Interaction = __decorate([
    (0, typeorm_1.Entity)('interactions')
], Interaction);
//# sourceMappingURL=interaction.entity.js.map