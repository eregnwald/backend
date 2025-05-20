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
exports.Task = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const contact_entity_1 = require("../../contacts/entities/contact.entity");
const account_entity_1 = require("../../accounts/entities/account.entity");
const task_status_entity_1 = require("../../task-statuses/entities/task-status.entity");
const task_priority_entity_1 = require("../../task-priorities/entities/task-priority.entity");
let Task = class Task {
    task_id;
    title;
    description;
    due_date;
    created_at;
    updated_at;
    is_urgent;
    status;
    priority;
    assignedUser;
    contact;
    account;
    is_deleted;
};
exports.Task = Task;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Task.prototype, "task_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Task.prototype, "due_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Task.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Task.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Task.prototype, "is_urgent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_status_entity_1.TaskStatus),
    (0, typeorm_1.JoinColumn)({ name: 'status_id' }),
    __metadata("design:type", task_status_entity_1.TaskStatus)
], Task.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_priority_entity_1.TaskPriority),
    (0, typeorm_1.JoinColumn)({ name: 'priority_id' }),
    __metadata("design:type", task_priority_entity_1.TaskPriority)
], Task.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assigned_to' }),
    __metadata("design:type", Object)
], Task.prototype, "assignedUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contact_entity_1.Contact, (contact) => contact.tasks),
    (0, typeorm_1.JoinColumn)({ name: 'related_contact' }),
    __metadata("design:type", Object)
], Task.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (account) => account.tasks),
    (0, typeorm_1.JoinColumn)({ name: 'related_account' }),
    __metadata("design:type", Object)
], Task.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Task.prototype, "is_deleted", void 0);
exports.Task = Task = __decorate([
    (0, typeorm_1.Entity)('tasks')
], Task);
//# sourceMappingURL=task.entity.js.map