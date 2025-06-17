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
exports.InteractionTypesController = void 0;
const common_1 = require("@nestjs/common");
const interaction_types_service_1 = require("./interaction-types.service");
const create_interaction_type_dto_1 = require("./dto/create-interaction-type.dto");
const update_interaction_type_dto_1 = require("./dto/update-interaction-type.dto");
let InteractionTypesController = class InteractionTypesController {
    interactionTypesService;
    constructor(interactionTypesService) {
        this.interactionTypesService = interactionTypesService;
    }
    create(createInteractionTypeDto) {
        return this.interactionTypesService.create(createInteractionTypeDto);
    }
    findAll() {
        return this.interactionTypesService.findAll();
    }
    findOne(id) {
        return this.interactionTypesService.findOne(+id);
    }
    update(id, updateInteractionTypeDto) {
        return this.interactionTypesService.update(+id, updateInteractionTypeDto);
    }
    remove(id) {
        return this.interactionTypesService.remove(+id);
    }
};
exports.InteractionTypesController = InteractionTypesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_interaction_type_dto_1.CreateInteractionTypeDto]),
    __metadata("design:returntype", void 0)
], InteractionTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InteractionTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InteractionTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_interaction_type_dto_1.UpdateInteractionTypeDto]),
    __metadata("design:returntype", void 0)
], InteractionTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InteractionTypesController.prototype, "remove", null);
exports.InteractionTypesController = InteractionTypesController = __decorate([
    (0, common_1.Controller)('interaction-types'),
    __metadata("design:paramtypes", [interaction_types_service_1.InteractionTypesService])
], InteractionTypesController);
//# sourceMappingURL=interaction-types.controller.js.map