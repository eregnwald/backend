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
exports.FunnelController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const funnel_service_1 = require("./funnel.service");
const create_funnel_dto_1 = require("./dto/create-funnel.dto");
const common_2 = require("@nestjs/common");
const funnel_stage_service_1 = require("../salesfunnelstages/funnel-stage.service");
let FunnelController = class FunnelController {
    funnelService;
    SalesFunnelStageService;
    constructor(funnelService, SalesFunnelStageService) {
        this.funnelService = funnelService;
        this.SalesFunnelStageService = SalesFunnelStageService;
    }
    async getMyFunnels(req) {
        const userId = req.user.sub;
        return this.funnelService.getFunnelsByUserId(userId);
    }
    async getShared(req) {
        return this.funnelService.getSharedFunnels();
    }
    async getSharedStages(req) {
        const sharedFunnel = await this.funnelService.getDefaultSharedFunnel();
        return this.SalesFunnelStageService.getStagesForFunnel(sharedFunnel.funnel_id);
    }
    async create(dto) {
        return this.funnelService.create(dto);
    }
    async getStages(id) {
        return this.funnelService.getStagesForFunnel(+id);
    }
    async getFunnels(ownerId, req) {
        if (ownerId) {
            return this.funnelService.getFunnelsByOwnerId(ownerId);
        }
        return this.funnelService.findAll();
    }
    async findOne(id) {
        const funnel = await this.funnelService.findOne(+id);
        if (!funnel) {
            throw new common_2.NotFoundException('Воронка не найдена');
        }
        return funnel;
    }
};
exports.FunnelController = FunnelController;
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FunnelController.prototype, "getMyFunnels", null);
__decorate([
    (0, common_1.Get)('shared'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FunnelController.prototype, "getShared", null);
__decorate([
    (0, common_1.Get)('shared/stages'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FunnelController.prototype, "getSharedStages", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_funnel_dto_1.CreateFunnelDto]),
    __metadata("design:returntype", Promise)
], FunnelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id/stages'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FunnelController.prototype, "getStages", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('owner_id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FunnelController.prototype, "getFunnels", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FunnelController.prototype, "findOne", null);
exports.FunnelController = FunnelController = __decorate([
    (0, common_1.Controller)('funnels'),
    __metadata("design:paramtypes", [funnel_service_1.SalesFunnelsService,
        funnel_stage_service_1.SalesFunnelStagesService])
], FunnelController);
//# sourceMappingURL=funnel.controller.js.map