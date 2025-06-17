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
exports.InteractionDetailsController = void 0;
const common_1 = require("@nestjs/common");
const interaction_details_service_1 = require("./interaction-details.service");
const create_interaction_detail_dto_1 = require("./dto/create-interaction-detail.dto");
const update_interaction_detail_dto_1 = require("./dto/update-interaction-detail.dto");
let InteractionDetailsController = class InteractionDetailsController {
    interactionDetailsService;
    constructor(interactionDetailsService) {
        this.interactionDetailsService = interactionDetailsService;
    }
    create(createInteractionDetailDto) {
        return this.interactionDetailsService.create(createInteractionDetailDto);
    }
    findAll() {
        return this.interactionDetailsService.findAll();
    }
    findOne(id) {
        return this.interactionDetailsService.findOne(+id);
    }
    update(id, updateInteractionDetailDto) {
        return this.interactionDetailsService.update(+id, updateInteractionDetailDto);
    }
    remove(id) {
        return this.interactionDetailsService.remove(+id);
    }
};
exports.InteractionDetailsController = InteractionDetailsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_interaction_detail_dto_1.CreateInteractionDetailDto]),
    __metadata("design:returntype", void 0)
], InteractionDetailsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InteractionDetailsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InteractionDetailsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_interaction_detail_dto_1.UpdateInteractionDetailDto]),
    __metadata("design:returntype", void 0)
], InteractionDetailsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InteractionDetailsController.prototype, "remove", null);
exports.InteractionDetailsController = InteractionDetailsController = __decorate([
    (0, common_1.Controller)('interaction-details'),
    __metadata("design:paramtypes", [interaction_details_service_1.InteractionDetailsService])
], InteractionDetailsController);
//# sourceMappingURL=interaction-details.controller.js.map