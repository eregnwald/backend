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
exports.OpportunityStagesController = void 0;
const common_1 = require("@nestjs/common");
const opportunity_stages_service_1 = require("./opportunity-stages.service");
const create_opportunity_stage_dto_1 = require("./dto/create-opportunity-stage.dto");
const update_opportunity_stage_dto_1 = require("./dto/update-opportunity-stage.dto");
let OpportunityStagesController = class OpportunityStagesController {
    stagesService;
    constructor(stagesService) {
        this.stagesService = stagesService;
    }
    async getAllStages() {
        return this.stagesService.findAll();
    }
    async getStage(id) {
        const stageId = parseInt(id, 10);
        return this.stagesService.findOne(stageId);
    }
    async createStage(dto) {
        return this.stagesService.create(dto);
    }
    async updateStage(id, dto) {
        const stageId = parseInt(id, 10);
        return this.stagesService.update(stageId, dto);
    }
    async deleteStage(id) {
        const stageId = parseInt(id, 10);
        return this.stagesService.remove(stageId);
    }
};
exports.OpportunityStagesController = OpportunityStagesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpportunityStagesController.prototype, "getAllStages", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OpportunityStagesController.prototype, "getStage", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_opportunity_stage_dto_1.CreateOpportunityStageDto]),
    __metadata("design:returntype", Promise)
], OpportunityStagesController.prototype, "createStage", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_opportunity_stage_dto_1.UpdateOpportunityStageDto]),
    __metadata("design:returntype", Promise)
], OpportunityStagesController.prototype, "updateStage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OpportunityStagesController.prototype, "deleteStage", null);
exports.OpportunityStagesController = OpportunityStagesController = __decorate([
    (0, common_1.Controller)('stages'),
    __metadata("design:paramtypes", [opportunity_stages_service_1.OpportunityStagesService])
], OpportunityStagesController);
//# sourceMappingURL=opportunity-stages.controller.js.map