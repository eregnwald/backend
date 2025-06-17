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
exports.DocumentLinksController = void 0;
const common_1 = require("@nestjs/common");
const document_links_service_1 = require("./document-links.service");
const create_document_link_dto_1 = require("./dto/create-document-link.dto");
const update_document_link_dto_1 = require("./dto/update-document-link.dto");
let DocumentLinksController = class DocumentLinksController {
    documentLinksService;
    constructor(documentLinksService) {
        this.documentLinksService = documentLinksService;
    }
    create(createDocumentLinkDto) {
        return this.documentLinksService.create(createDocumentLinkDto);
    }
    findAll() {
        return this.documentLinksService.findAll();
    }
    findOne(id) {
        return this.documentLinksService.findOne(+id);
    }
    update(id, updateDocumentLinkDto) {
        return this.documentLinksService.update(+id, updateDocumentLinkDto);
    }
    remove(id) {
        return this.documentLinksService.remove(+id);
    }
};
exports.DocumentLinksController = DocumentLinksController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_document_link_dto_1.CreateDocumentLinkDto]),
    __metadata("design:returntype", void 0)
], DocumentLinksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocumentLinksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentLinksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_document_link_dto_1.UpdateDocumentLinkDto]),
    __metadata("design:returntype", void 0)
], DocumentLinksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentLinksController.prototype, "remove", null);
exports.DocumentLinksController = DocumentLinksController = __decorate([
    (0, common_1.Controller)('document-links'),
    __metadata("design:paramtypes", [document_links_service_1.DocumentLinksService])
], DocumentLinksController);
//# sourceMappingURL=document-links.controller.js.map