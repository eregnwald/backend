"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tasks_controller_1 = require("./tasks.controller");
const tasks_service_1 = require("./tasks.service");
const task_entity_1 = require("./entities/task.entity");
const task_status_entity_1 = require("../task-statuses/entities/task-status.entity");
const task_priority_entity_1 = require("../task-priorities/entities/task-priority.entity");
const contact_entity_1 = require("../contacts/entities/contact.entity");
const account_entity_1 = require("../accounts/entities/account.entity");
const user_entity_1 = require("../users/entities/user.entity");
const opportunity_entity_1 = require("../opportunities/entities/opportunity.entity");
const opportunitytask_entity_1 = require("../opportunitytask/entitites/opportunitytask.entity");
const notifications_module_1 = require("../notifications/notifications.module");
const notifications_service_1 = require("../notifications/notifications.service");
const notification_entity_1 = require("../notifications/entities/notification.entity");
let TasksModule = class TasksModule {
};
exports.TasksModule = TasksModule;
exports.TasksModule = TasksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                task_entity_1.Task,
                task_status_entity_1.TaskStatus,
                task_priority_entity_1.TaskPriority,
                contact_entity_1.Contact,
                account_entity_1.Account,
                user_entity_1.User,
                opportunity_entity_1.Opportunity,
                opportunitytask_entity_1.OpportunityTask,
                notifications_module_1.NotificationsModule,
                notification_entity_1.Notification,
            ]),
        ],
        controllers: [tasks_controller_1.TasksController],
        providers: [tasks_service_1.TasksService, notifications_service_1.NotificationsService],
    })
], TasksModule);
//# sourceMappingURL=tasks.module.js.map