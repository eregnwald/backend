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
exports.EntityTag = void 0;
const typeorm_1 = require("typeorm");
const tag_entity_1 = require("../../tags/entities/tag.entity");
let EntityTag = class EntityTag {
    entity_type;
    entity_id;
    tag_id;
    tag;
};
exports.EntityTag = EntityTag;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], EntityTag.prototype, "entity_type", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], EntityTag.prototype, "entity_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], EntityTag.prototype, "tag_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tag_entity_1.Tag, tag => tag.entityTags),
    (0, typeorm_1.JoinColumn)({ name: 'tag_id' }),
    __metadata("design:type", tag_entity_1.Tag)
], EntityTag.prototype, "tag", void 0);
exports.EntityTag = EntityTag = __decorate([
    (0, typeorm_1.Entity)('entity_tags')
], EntityTag);
//# sourceMappingURL=entity-tag.entity.js.map