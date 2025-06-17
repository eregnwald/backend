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
exports.OpportunitiesController = void 0;
const common_1 = require("@nestjs/common");
const opportunities_service_1 = require("./opportunities.service");
const create_opportunity_dto_1 = require("./dto/create-opportunity.dto");
const update_opportunity_dto_1 = require("./dto/update-opportunity.dto");
const update_stage_dto_1 = require("./dto/update-stage.dto");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const create_task_dto_1 = require("./dto/create-task.dto");
let OpportunitiesController = class OpportunitiesController {
    opportunitiesService;
    constructor(opportunitiesService) {
        this.opportunitiesService = opportunitiesService;
    }
    create(createOpportunityDto) {
        return this.opportunitiesService.create(createOpportunityDto);
    }
    async createTask(opportunityId, dto) {
        return this.opportunitiesService.createTask(opportunityId, dto);
    }
    findAll(req) {
        return this.opportunitiesService.findAll(req.user);
    }
    async getFunnelData() {
        return this.opportunitiesService.getFunnelData();
    }
    findOne(id) {
        return this.opportunitiesService.findOne(+id);
    }
    async updateOpportunity(id, dto) {
        return this.opportunitiesService.update(+id, dto);
    }
    remove(id) {
        return this.opportunitiesService.remove(+id);
    }
    restore(id) {
        return this.opportunitiesService.restore(+id);
    }
    async getOpportunitiesByFunnelId(funnelId) {
        return this.opportunitiesService.getOpportunitiesByFunnelId(funnelId);
    }
    async updateStage(id, dto) {
        console.log('DTO:', dto);
        const result = await this.opportunitiesService.updateStage(+id, dto.stage_id, dto.lost_reason);
        console.log('Updated Opportunity:', result);
        return result;
    }
    async updateOwner(id, dto) {
        return this.opportunitiesService.update(+id, dto);
    }
    async getTasks(id) {
        return this.opportunitiesService.getTasksByOpportunity(id);
    }
    async addTask(opportunityId, taskId) {
        await this.opportunitiesService.addTask(opportunityId, taskId);
        return { message: 'Задача успешно привязана к сделке' };
    }
    async removeTask(opportunityId, taskId) {
        await this.opportunitiesService.removeTask(opportunityId, taskId);
        return { message: 'Задача успешно отвязана от сделки' };
    }
};
exports.OpportunitiesController = OpportunitiesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_opportunity_dto_1.CreateOpportunityDto]),
    __metadata("design:returntype", void 0)
], OpportunitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':opportunityId/tasks'),
    __param(0, (0, common_1.Param)('opportunityId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], OpportunitiesController.prototype, "createTask", null);
__decorate([
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OpportunitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('funnel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpportunitiesController.prototype, "getFunnelData", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OpportunitiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_opportunity_dto_1.UpdateOpportunityDto]),
    __metadata("design:returntype", Promise)
], OpportunitiesController.prototype, "updateOpportunity", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OpportunitiesController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OpportunitiesController.prototype, "restore", null);
__decorate([
    (0, common_1.Get)('funnel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OpportunitiesController.prototype, "getOpportunitiesByFunnelId", null);
__decorate([
    (0, common_1.Patch)(':id/stage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stage_dto_1.UpdateStageDto]),
    __metadata("design:returntype", Promise)
], OpportunitiesController.prototype, "updateStage", null);
__decorate([
    (0, common_1.Patch)(':id/owner'),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OpportunitiesController.prototype, "updateOwner", null);
__decorate([
    (0, common_1.Get)(':id/tasks'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OpportunitiesController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Post)(':opportunityId/tasks/:taskId'),
    __param(0, (0, common_1.Param)('opportunityId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('taskId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], OpportunitiesController.prototype, "addTask", null);
__decorate([
    (0, common_1.Delete)(':opportunityId/tasks/:taskId'),
    __param(0, (0, common_1.Param)('opportunityId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('taskId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], OpportunitiesController.prototype, "removeTask", null);
exports.OpportunitiesController = OpportunitiesController = __decorate([
    (0, common_1.Controller)('opportunities'),
    __metadata("design:paramtypes", [opportunities_service_1.OpportunitiesService])
], OpportunitiesController);
//# sourceMappingURL=opportunities.controller.js.map