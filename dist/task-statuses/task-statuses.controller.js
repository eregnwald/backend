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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusesController = void 0;
const common_1 = require("@nestjs/common");
const task_statuses_service_1 = require("./task-statuses.service");
const create_task_status_dto_1 = require("./dto/create-task-status.dto");
const update_task_status_dto_1 = require("./dto/update-task-status.dto");
let TaskStatusesController = class TaskStatusesController {
    taskStatusesService;
    constructor(taskStatusesService) {
        this.taskStatusesService = taskStatusesService;
    }
    create(createTaskStatusDto) {
        return this.taskStatusesService.create(createTaskStatusDto);
    }
    findAll() {
        return this.taskStatusesService.findAll();
    }
    findOne(id) {
        return this.taskStatusesService.findOne(+id);
    }
    update(id, updateTaskStatusDto) {
        return this.taskStatusesService.update(+id, updateTaskStatusDto);
    }
    remove(id) {
        return this.taskStatusesService.remove(+id);
    }
};
exports.TaskStatusesController = TaskStatusesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_status_dto_1.CreateTaskStatusDto]),
    __metadata("design:returntype", void 0)
], TaskStatusesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskStatusesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskStatusesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_status_dto_1.UpdateTaskStatusDto]),
    __metadata("design:returntype", void 0)
], TaskStatusesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskStatusesController.prototype, "remove", null);
exports.TaskStatusesController = TaskStatusesController = __decorate([
    (0, common_1.Controller)('task-statuses'),
    __metadata("design:paramtypes", [task_statuses_service_1.TaskStatusesService])
], TaskStatusesController);
//# sourceMappingURL=task-statuses.controller.js.map