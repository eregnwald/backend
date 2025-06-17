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
exports.FunnelStageController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const funnel_stage_service_1 = require("./funnel-stage.service");
const create_stage_dto_1 = require("./dto/create-stage.dto");
const update_stage_dto_1 = require("./dto/update-stage.dto");
let FunnelStageController = class FunnelStageController {
    stageService;
    constructor(stageService) {
        this.stageService = stageService;
    }
    async getAll(funnelId) {
        return this.stageService.findAll(+funnelId);
    }
    async getById(stageId) {
        return this.stageService.findOne(+stageId);
    }
    create(funnelId, dto) {
        return this.stageService.create(+funnelId, dto);
    }
    update(stageId, dto) {
        return this.stageService.update(+stageId, dto);
    }
    delete(stageId) {
        return this.stageService.remove(+stageId);
    }
    async bulkUpdate(funnelId, dtos) {
        return this.stageService.bulkUpdate(+funnelId, dtos);
    }
};
exports.FunnelStageController = FunnelStageController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('funnelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FunnelStageController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':stageId'),
    __param(0, (0, common_1.Param)('stageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FunnelStageController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('funnelId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_stage_dto_1.CreateStageDto]),
    __metadata("design:returntype", void 0)
], FunnelStageController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':stageId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('stageId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stage_dto_1.UpdateStageDto]),
    __metadata("design:returntype", void 0)
], FunnelStageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':stageId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('stageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FunnelStageController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('funnelId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], FunnelStageController.prototype, "bulkUpdate", null);
exports.FunnelStageController = FunnelStageController = __decorate([
    (0, common_1.Controller)('funnels/:funnelId/stages'),
    __metadata("design:paramtypes", [funnel_stage_service_1.SalesFunnelStagesService])
], FunnelStageController);
//# sourceMappingURL=funnel-stage.controller.js.map