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
exports.Opportunity = void 0;
const typeorm_1 = require("typeorm");
const account_entity_1 = require("../../accounts/entities/account.entity");
const contact_entity_1 = require("../../contacts/entities/contact.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const funnel_stage_entity_1 = require("../../salesfunnelstages/funnel-stage.entity");
const task_entity_1 = require("../../tasks/entities/task.entity");
let Opportunity = class Opportunity {
    opportunity_id;
    opportunity_name;
    amount;
    contact_id;
    owner_id;
    is_deleted;
    close_date;
    created_at;
    updated_at;
    account_id;
    account;
    contact;
    owner;
    is_closed;
    stage_id;
    stage;
    funnel_id;
    task_id;
    task;
    is_won;
    lost_reason;
    won_date;
    lost_date;
};
exports.Opportunity = Opportunity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Opportunity.prototype, "opportunity_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, }),
    __metadata("design:type", String)
], Opportunity.prototype, "opportunity_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 18, scale: 2 }),
    __metadata("design:type", Number)
], Opportunity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Opportunity.prototype, "contact_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Opportunity.prototype, "owner_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Opportunity.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Opportunity.prototype, "close_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Opportunity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Opportunity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Opportunity.prototype, "account_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'account_id' }),
    __metadata("design:type", Object)
], Opportunity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contact_entity_1.Contact, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'contact_id' }),
    __metadata("design:type", Object)
], Opportunity.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'owner_id' }),
    __metadata("design:type", user_entity_1.User)
], Opportunity.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Opportunity.prototype, "is_closed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: false }),
    __metadata("design:type", Number)
], Opportunity.prototype, "stage_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => funnel_stage_entity_1.SalesFunnelStage),
    (0, typeorm_1.JoinColumn)({ name: 'stage_id' }),
    __metadata("design:type", funnel_stage_entity_1.SalesFunnelStage)
], Opportunity.prototype, "stage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], Opportunity.prototype, "funnel_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Opportunity.prototype, "task_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_entity_1.Task, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'task_id' }),
    __metadata("design:type", Object)
], Opportunity.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Opportunity.prototype, "is_won", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Opportunity.prototype, "lost_reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Opportunity.prototype, "won_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Opportunity.prototype, "lost_date", void 0);
exports.Opportunity = Opportunity = __decorate([
    (0, typeorm_1.Entity)('opportunities')
], Opportunity);
//# sourceMappingURL=opportunity.entity.js.map