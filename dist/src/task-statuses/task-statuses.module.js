"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusesModule = void 0;
const common_1 = require("@nestjs/common");
const task_statuses_service_1 = require("./task-statuses.service");
const task_statuses_controller_1 = require("./task-statuses.controller");
let TaskStatusesModule = class TaskStatusesModule {
};
exports.TaskStatusesModule = TaskStatusesModule;
exports.TaskStatusesModule = TaskStatusesModule = __decorate([
    (0, common_1.Module)({
        controllers: [task_statuses_controller_1.TaskStatusesController],
        providers: [task_statuses_service_1.TaskStatusesService],
    })
], TaskStatusesModule);
//# sourceMappingURL=task-statuses.module.js.map