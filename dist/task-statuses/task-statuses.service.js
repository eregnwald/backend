"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusesService = void 0;
const common_1 = require("@nestjs/common");
let TaskStatusesService = class TaskStatusesService {
    create(createTaskStatusDto) {
        return 'This action adds a new taskStatus';
    }
    findAll() {
        return `This action returns all taskStatuses`;
    }
    findOne(id) {
        return `This action returns a #${id} taskStatus`;
    }
    update(id, updateTaskStatusDto) {
        return `This action updates a #${id} taskStatus`;
    }
    remove(id) {
        return `This action removes a #${id} taskStatus`;
    }
};
exports.TaskStatusesService = TaskStatusesService;
exports.TaskStatusesService = TaskStatusesService = __decorate([
    (0, common_1.Injectable)()
], TaskStatusesService);
//# sourceMappingURL=task-statuses.service.js.map