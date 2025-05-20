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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentLink = void 0;
const typeorm_1 = require("typeorm");
const document_entity_1 = require("../../documents/entities/document.entity");
let DocumentLink = class DocumentLink {
    link_id;
    document;
    entity_type;
    entity_id;
};
exports.DocumentLink = DocumentLink;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], DocumentLink.prototype, "link_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.Document, document => document.documentLinks, { onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'document_id' }),
    __metadata("design:type", document_entity_1.Document)
], DocumentLink.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], DocumentLink.prototype, "entity_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], DocumentLink.prototype, "entity_id", void 0);
exports.DocumentLink = DocumentLink = __decorate([
    (0, typeorm_1.Entity)('document_links')
], DocumentLink);
//# sourceMappingURL=document-link.entity.js.map