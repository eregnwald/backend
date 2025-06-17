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
exports.EntityTagsController = void 0;
const common_1 = require("@nestjs/common");
const entity_tags_service_1 = require("./entity-tags.service");
const create_entity_tag_dto_1 = require("./dto/create-entity-tag.dto");
const update_entity_tag_dto_1 = require("./dto/update-entity-tag.dto");
let EntityTagsController = class EntityTagsController {
    entityTagsService;
    constructor(entityTagsService) {
        this.entityTagsService = entityTagsService;
    }
    create(createEntityTagDto) {
        return this.entityTagsService.create(createEntityTagDto);
    }
    findAll() {
        return this.entityTagsService.findAll();
    }
    findOne(id) {
        return this.entityTagsService.findOne(+id);
    }
    update(id, updateEntityTagDto) {
        return this.entityTagsService.update(+id, updateEntityTagDto);
    }
    remove(id) {
        return this.entityTagsService.remove(+id);
    }
};
exports.EntityTagsController = EntityTagsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_entity_tag_dto_1.CreateEntityTagDto]),
    __metadata("design:returntype", void 0)
], EntityTagsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EntityTagsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EntityTagsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_entity_tag_dto_1.UpdateEntityTagDto]),
    __metadata("design:returntype", void 0)
], EntityTagsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EntityTagsController.prototype, "remove", null);
exports.EntityTagsController = EntityTagsController = __decorate([
    (0, common_1.Controller)('entity-tags'),
    __metadata("design:paramtypes", [entity_tags_service_1.EntityTagsService])
], EntityTagsController);
//# sourceMappingURL=entity-tags.controller.js.map