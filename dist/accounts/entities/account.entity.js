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
exports.Account = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const contact_entity_1 = require("../../contacts/entities/contact.entity");
const opportunity_entity_1 = require("../../opportunities/entities/opportunity.entity");
const interaction_entity_1 = require("../../interactions/entities/interaction.entity");
const account_contact_entity_1 = require("../../account-contacts/entities/account-contact.entity");
const task_entity_1 = require("../../tasks/entities/task.entity");
let Account = class Account {
    account_id;
    account_name;
    industry;
    website;
    phone;
    annual_revenue;
    employee_count;
    billing_address;
    shipping_address;
    owner;
    created_at;
    updated_at;
    is_deleted;
    contacts;
    opportunities;
    interactions;
    accountContacts;
    tasks;
};
exports.Account = Account;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Account.prototype, "account_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Account.prototype, "account_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "industry", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Account.prototype, "annual_revenue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Account.prototype, "employee_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Account.prototype, "billing_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Account.prototype, "shipping_address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.accounts, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'owner_id' }),
    __metadata("design:type", Object)
], Account.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Account.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Account.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Account.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contact_entity_1.Contact, contact => contact.account),
    __metadata("design:type", Array)
], Account.prototype, "contacts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => opportunity_entity_1.Opportunity, opportunity => opportunity.account),
    __metadata("design:type", Array)
], Account.prototype, "opportunities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => interaction_entity_1.Interaction, interaction => interaction.account),
    __metadata("design:type", Array)
], Account.prototype, "interactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => account_contact_entity_1.AccountContact, accountContact => accountContact.account),
    __metadata("design:type", Array)
], Account.prototype, "accountContacts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, (task) => task.account),
    __metadata("design:type", Array)
], Account.prototype, "tasks", void 0);
exports.Account = Account = __decorate([
    (0, typeorm_1.Entity)('accounts')
], Account);
//# sourceMappingURL=account.entity.js.map